import { RuleEffect } from "@jsonforms/core"
import { JSONSchema } from "json-schema-to-ts"
import { UISchema } from "../ui-schema"

export const sampleIntegerSchema = {
  title: "Amount",
  type: "integer",
  default: 42,
} satisfies JSONSchema

export const sampleNumberSchema = {
  title: "Amount",
  type: "number",
  default: 42.42,
} satisfies JSONSchema

export const stringSchema = {
  type: "string",
  title: "Yolo Text",
  default: "yolo",
} satisfies JSONSchema

export const numberSchema = {
  type: "number",
  title: "My Number",
  default: 1,
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