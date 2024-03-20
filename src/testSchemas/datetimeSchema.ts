import { JSONSchema } from "json-schema-to-ts"
import { UISchema } from "../ui-schema"
import { RuleEffect } from "@jsonforms/core"

export const datetimeSchema = {
  type: "object",
  properties: {
    datetime: {
      type: "string",
      title: "The Future is Now",
      format: "date-time",
    },
  },
  required: ["datetime"],
} satisfies JSONSchema

export const datetimeUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/datetime",
    },
  ],
} satisfies UISchema

export const datetimeUISchemaWithRule = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/datetime",
      rule: {
        effect: RuleEffect.HIDE,
        condition: {},
      },
    },
  ],
} satisfies UISchema
