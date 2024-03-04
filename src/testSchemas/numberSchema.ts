import { RuleEffect } from "@jsonforms/core"
import { JSONSchema } from "json-schema-to-ts"
import { UISchema } from "../ui-schema"

export const numberSchema = {
  type: "number",
  title: "My Number",
  default: 42.42,
} satisfies JSONSchema

export const nullableNumberSchema = {
  type: "number",
  title: "My Number",
  default: 1,
  nullable: true,
} satisfies JSONSchema

export const numberMinMaxSchema = {
  type: "number",
  title: "My Number",
  minimum: 0,
  maximum: 1000,
  default: 50,
} satisfies JSONSchema

export const numberUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#",
    },
  ],
} satisfies UISchema

export const numberUISchemaWithRule = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#",
      rule: {
        effect: RuleEffect.HIDE,
        condition: {},
      },
    },
  ],
} satisfies UISchema