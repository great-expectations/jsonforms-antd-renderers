import { JSONSchema } from "json-schema-to-ts"
import { screen } from "@testing-library/react"
import { test, describe, expect } from "vitest"
import { render } from "../common/test-render"
import { UISchema } from "../ui-schema"

const schema = {
  type: "object",
  properties: {
    labelMe: { title: "Label Me", oneOf: [{ type: "string" }] },
  },
} satisfies JSONSchema

describe("ControlLabel", () => {
  test("ControlLabel renders a title jsonschema property as the label", async () => {
    render({ schema })
    await screen.findByText("Label Me")
  })
  test("ControlLabel gives precedence to a string literal label property over the jsonschema title", async () => {
    render({
      schema,
      uischema: {
        type: "VerticalLayout",
        elements: [
          {
            type: "Control",
            scope: "#/properties/labelMe",
            label: "No, Label ME",
          },
        ],
      } satisfies UISchema,
    })
    await screen.findByText("No, Label ME")
  })
  test("ControlLabel renders text from a label property that is a LabelDescription", async () => {
    render({
      schema,
      uischema: {
        type: "VerticalLayout",
        elements: [
          {
            type: "Control",
            scope: "#/properties/labelMe",
            label: {
              text: "Srsly, label me instead",
            },
          },
        ],
      } satisfies UISchema,
    })
    await screen.findByText("Srsly, label me instead")
  })
  test("ControlLabel renders an AntD Text component from a LabelDescription", async () => {
    render({
      schema,
      uischema: {
        type: "VerticalLayout",
        elements: [
          {
            type: "Control",
            scope: "#/properties/labelMe",
            label: {
              text: "Srsly, label me instead",
              type: "Text",
              textProps: { disabled: true },
            },
          },
        ],
      } satisfies UISchema,
    })
    await screen.findByText("Srsly, label me instead")

    expect(screen.getByText("Srsly, label me instead")).toHaveClass(
      "ant-typography-disabled",
    )
  })
  test("ControlLabel renders an AntD Title component from a LabelDescription", async () => {
    render({
      schema,
      uischema: {
        type: "VerticalLayout",
        elements: [
          {
            type: "Control",
            scope: "#/properties/labelMe",
            label: {
              text: "Srsly, label me instead",
              type: "Title",
              titleProps: { copyable: true },
            },
          },
        ],
      } satisfies UISchema,
    })
    await screen.findByLabelText("copy")
  })
})
