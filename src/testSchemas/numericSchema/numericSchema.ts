import { RuleEffect } from "@jsonforms/core"
import { JSONSchema } from "json-schema-to-ts"
import { UISchema } from "../../ui-schema"

export const numericMagnitudeSchema = {
  type: "object",
  properties: {
    numericValue: {
      title: "Magnitude",
      type: "number",
    },
  },
  required: ["numericValue"],
} satisfies JSONSchema

export const numericTheNumberSchema = {
  type: "number",
  properties: {
    numericValue: {
      title: "The Number",
      type: "number",
      default: 42.42,
    },
  },
  required: ["numericValue"],
} satisfies JSONSchema

export const numericWeightSchema = {
  type: "object",
  properties: {
    numericValue: {
      title: "Weight",
      type: "number",
    },
  },
} satisfies JSONSchema

export const numericPriceSchema = {
  type: "object",
  properties: {
    numericValue: {
      title: "Price",
      type: "number",
    },
  },
  required: ["numericValue"],
} satisfies JSONSchema

export const numericSheepSchema = {
  type: "object",
  properties: {
    numericValue: {
      title: "Sheep",
      type: "integer",
    },
  },
  required: ["numericValue"],
} satisfies JSONSchema

export const numericBeansSchema = {
  type: "object",
  properties: {
    numericValue: {
      title: "Beans",
      type: ["integer"],
    },
  },
  required: ["numericValue"],
} satisfies JSONSchema

export const numericROISchema = {
  type: "object",
  properties: {
    numericValue: {
      title: "Return on Investment",
      type: "number",
    },
  },
  required: ["numericValue"],
} satisfies JSONSchema

export const numericVerticalUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/numericValue",
    },
  ],
} satisfies UISchema

export const numericHorizontalUISchema = {
  type: "HorizontalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/numericValue",
    },
  ],
} satisfies UISchema

export const numericUSDUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/numericValue",
      options: {
        addonBefore: "$",
      },
    },
  ],
} satisfies UISchema

export const numericPercentageUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/numericValue",
      options: {
        addonAfter: "%",
      },
    },
  ],
} satisfies UISchema

export const numericUISchemaWithRule = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/numericValue",
      rule: {
        effect: RuleEffect.HIDE,
        condition: {},
      },
    },
  ],
} satisfies UISchema
