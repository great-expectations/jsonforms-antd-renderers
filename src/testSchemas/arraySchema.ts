import { JSONSchema } from "json-schema-to-ts"
import { UISchema } from "../ui-schema"

export const sampleArrayOfStringsSchema = {
  type: "object",
  properties: {
    array: {
      title: "My Array",
      type: "array",
      items: {
        type: "string",
      },
    }
  },
} satisfies JSONSchema

export const uiSchemaWithNoElements = {
  type: "VerticalLayout",
  elements: [],
} satisfies UISchema

export const uiSchemaWithTheArray = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/array",
    },
  ],
} satisfies UISchema

export const uiSchemaWithHideRule = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/array",
      rule: {
        effect: "HIDE",
        condition: {},
      },
    },
  ],
} satisfies UISchema
