import { JSONSchema } from "json-schema-to-ts"
import { screen } from "@testing-library/react"
import { test, expect, describe } from "vitest"
import { render } from "../../common/test-render"
import userEvent from "@testing-library/user-event"
import { OneOfControlOptions } from "../../ui-schema"

const schema = {
  type: "object",
  properties: {
    deliveryOption: {
      title: "Delivery Option",
      oneOf: [
        {
          title: "Pickup",
          type: "object",
          properties: {
            time: { type: "string" },
            location: { type: "string" },
          },
        },
        {
          title: "Delivery",
          type: "object",
          properties: {
            address: { type: "string" },
            phone: { type: "string" },
          },
        },
      ] as const,
    },
  },
  // required: ["name"],
} satisfies JSONSchema

describe("OneOf control", () => {
  test("OneOf Control with default UISchema allows switching between subschemas", async () => {
    render({ schema })
    await screen.findByText("Pickup")
    screen.getByLabelText("Location")

    await userEvent.click(screen.getByLabelText("Delivery"))
    screen.getByLabelText("Address")
  })
  test("OneOf Control with button UISchema allows switching between subschemas", async () => {
    render({
      schema,
      uischema: {
        type: "VerticalLayout",
        elements: [
          {
            type: "Control",
            scope: "#/properties/deliveryOption",
            options: { optionType: "button" } satisfies OneOfControlOptions,
          },
        ],
      },
    })
    await screen.findByText("Pickup")
    screen.getByLabelText("Location")

    await userEvent.click(screen.getByText("Delivery"))
    screen.getByLabelText("Address")
  })
  test("OneOf Control with dropdown UISchema allows switching between subschemas", async () => {
    render({
      schema,
      uischema: {
        type: "VerticalLayout",
        elements: [
          {
            type: "Control",
            scope: "#/properties/deliveryOption",
            options: { optionType: "dropdown" } satisfies OneOfControlOptions,
          },
        ],
      },
    })
    await screen.findByText("Pickup")
    screen.getByLabelText("Location")

    await userEvent.click(screen.getByText("Pickup"))
    await userEvent.click(screen.getByText("Delivery"))
    screen.getByLabelText("Address")
  })
  test("OneOf Control with segmented UISchema allows switching between subschemas", async () => {
    render({
      schema,
      uischema: {
        type: "VerticalLayout",
        elements: [
          {
            type: "Control",
            scope: "#/properties/deliveryOption",
            options: { optionType: "segmented" } satisfies OneOfControlOptions,
          },
        ],
      },
    })
    await screen.findByText("Pickup")
    screen.getByLabelText("Location")

    await userEvent.click(screen.getByText("Delivery"))
    screen.getByLabelText("Address")
  })
  test("OneOf Control persists state when switching between subschemas", async () => {
    render({ schema })
    await screen.findByText("Pickup")
    let locationInput = screen.getByLabelText("Location")
    await userEvent.type(locationInput, "abc")

    await userEvent.click(screen.getByLabelText("Delivery"))
    const addressInput = screen.getByLabelText("Address")
    await userEvent.type(addressInput, "xyz")

    await userEvent.click(screen.getByLabelText("Pickup"))
    locationInput = screen.getByLabelText("Location")
    expect(locationInput).toHaveValue("abc")
  })
})
