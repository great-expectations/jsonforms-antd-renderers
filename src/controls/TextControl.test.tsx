import { test, expect } from "vitest"
import { screen, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import type { JSONSchema } from "json-schema-to-ts"

import { render } from "../common/test-render"
import type { UISchema } from "../ui-schema"
import type { JSONFormData } from "../common/schema-derived-types"

const textInputSchema = {
  type: "object",
  properties: { foo: { type: "string", title: "Foo" } },
  additionalProperties: false,
} satisfies JSONSchema

const defaultValueTextInputSchema = {
  type: "object",
  properties: {
    foo: { type: "string", title: "Foo", default: "i love pizza" },
  },
  additionalProperties: false,
} satisfies JSONSchema

test("renders data that the user enters", async () => {
  render({
    schema: {
      type: "object",
      properties: { name: { type: "string", title: "name" } },
    },
    data: {},
  })
  const input = await screen.findByLabelText("name")
  await userEvent.type(input, "abc")
  await screen.findByDisplayValue("abc")
  expect(input).toHaveValue("abc")
})

test("renders default value when present", async () => {
  render({
    schema: defaultValueTextInputSchema,
  })
  await waitFor(() => {
    expect(
      screen.getByPlaceholderText(
        "Enter " + defaultValueTextInputSchema.properties.foo.title,
        { exact: false },
      ),
    ).toHaveValue(defaultValueTextInputSchema.properties.foo.default)
  })
})

test("updates jsonforms data as expected", async () => {
  let data: JSONFormData<typeof textInputSchema> = {}
  render({
    schema: textInputSchema,
    data,
    onChange: (result) => {
      data = result.data
    },
  })

  const input = screen.getByPlaceholderText(
    "Enter " + textInputSchema.properties.foo.title,
    { exact: false },
  )

  await userEvent.clear(input)
  await userEvent.type(input, "a")
  await waitFor(() => {
    expect(data).toEqual({ foo: "a" })
  })
})

test("renders a password when present", async () => {
  const passwordUISchema: UISchema = {
    type: "Control",
    scope: "#/properties/secret",
    options: { type: "password" },
  }
  const passwordSchema = {
    properties: { secret: { type: "string", title: "Secret" } },
  } satisfies JSONSchema

  render({ schema: passwordSchema, uischema: passwordUISchema })
  await screen.findByPlaceholderText(
    "Enter " + passwordSchema.properties.secret.title,
    { exact: false },
  )
  expect(
    (screen.getByLabelText("Secret") satisfies HTMLInputElement).type,
  ).toEqual("password")
})

test("renders error messages from rule validation", async () => {
  const patternUISchema: UISchema = {
    type: "Control",
    scope: "#/properties/name",
    options: {
      rules: [
        {
          pattern: "^[a-zA-Z ]*$",
          message: "Only letters are allowed",
        },
      ],
    },
  }

  const patternSchema = {
    type: "object",
    properties: { name: { type: "string", title: "Name" } },
  } satisfies JSONSchema

  render({
    schema: patternSchema,
    uischema: patternUISchema,
  })

  const inputElement = await screen.findByPlaceholderText(
    "Enter " + patternSchema.properties.name.title,
    { exact: false },
  )

  await userEvent.type(inputElement, "123")
  await userEvent.tab() // to trigger onBlur validation

  await screen.findByText("Only letters are allowed")
})
