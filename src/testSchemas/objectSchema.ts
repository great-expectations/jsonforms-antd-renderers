import { JSONSchema } from "json-schema-to-ts"
import { UISchema } from "../ui-schema"
import { RuleEffect } from "@jsonforms/core"

export const objectSchema = {
  type: "object",
  title: "My Object",
  properties: {
    name: {
      title: "Name",
      type: "string",
    },
    lastName: {
      title: "Last Name",
      type: "string",
    },
  },
  additionalProperties: false,
} satisfies JSONSchema

export const objectUISchemaWithName = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/name",
    },
  ],
} satisfies UISchema

export const objectUISchemaWithNameAndLastName = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/name",
    },
    {
      type: "Control",
      scope: "#/properties/lastName",
    },
  ],
} satisfies UISchema

export const objectUISchemaWithRule = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/name",
    },
    {
      type: "Control",
      scope: "#/properties/lastName",
      rule: {
        effect: RuleEffect.HIDE,
        condition: {
          scope: "#/properties/name",
          schema: { const: "John" },
        },
      },
    },
  ],
} satisfies UISchema
