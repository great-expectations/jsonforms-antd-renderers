import { JSONSchema } from "json-schema-to-ts"
import { UISchema } from "../ui-schema"
import { RuleEffect } from "@jsonforms/core"

export const dateSchema = {
  type: "object",
  properties: {
    date: {
      type: "string",
      title: "The Future is Now",
      format: "date",
    },
  },
} satisfies JSONSchema

export const dateUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/date",
    },
  ],
} satisfies UISchema

export const dateUISchemaWithRule = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/date",
      rule: {
        effect: RuleEffect.HIDE,
        condition: {},
      },
    },
  ],
} satisfies UISchema
