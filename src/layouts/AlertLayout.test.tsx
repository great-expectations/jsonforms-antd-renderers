import { test } from "vitest"
import { screen } from "@testing-library/react"
import { render } from "../common/test-render"
import { JSONSchema } from "json-schema-to-ts"

const schema = {
  type: "object",
  properties: {
    text: { type: "string" },
    options: {
      type: "object",
      properties: {
        type: {
          type: "string",
        },
      },
    },
  },
} satisfies JSONSchema

test("AlertLayout renders", async () => {
  render({
    schema: schema,
    uischema: {
      type: "VerticalLayout",
      elements: [
        {
          type: "Label",
          text: "An African swallow, maybe -- but not a European swallow, that's my point.",
        },
      ],
    },
  })
  await screen.findByRole("alert")
})
