import { RuleEffect } from "@jsonforms/core"
import { JSONSchema } from "json-schema-to-ts"
import { UISchema } from "../ui-schema"

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
  type: "object",
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
} satisfies UISchema<typeof numericROISchema>

export const numericTooltipUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/numericValue",
      formItemProps: {
        tooltip:
          "Sheep (pl.: sheep) or domestic sheep (Ovis aries) are a domesticated, ruminant mammal typically kept as livestock.",
      },
    },
  ],
} satisfies UISchema<typeof numericSheepSchema>

export const numericHorizontalUISchema = {
  type: "HorizontalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/numericValue",
    },
  ],
} satisfies UISchema<typeof numericROISchema>

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
} satisfies UISchema<typeof numericROISchema>

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
} satisfies UISchema<typeof numericROISchema>

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
} satisfies UISchema<typeof numericROISchema>
