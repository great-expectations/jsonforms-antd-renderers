import { RuleEffect } from "@jsonforms/core"
import { JSONSchema } from "json-schema-to-ts"
import { UISchema } from "../ui-schema"

export const numericSliderBasisPointsSchema = {
  type: "object",
  properties: {
    numericRangeValue: {
      title: "Basis Points",
      type: "number",
      minimum: 0,
      maximum: 10000,
      multipleOf: 1,
    },
  },
  required: ["numericRangeValue"],
} satisfies JSONSchema

export const numericSliderTemperatureSchema = {
  type: "object",
  properties: {
    numericRangeValue: {
      title: "Today's Temperature",
      type: "number",
      minimum: -50,
      maximum: 150,
      multipleOf: 1,
      default: 70,
    },
  },
  required: ["numericRangeValue"],
} satisfies JSONSchema

export const numericSliderHumiditySchema = {
  type: "object",
  properties: {
    numericRangeValue: {
      title: "Humidity",
      type: "number",
      minimum: 0.0,
      maximum: 1.0,
      multipleOf: 0.01,
    },
  },
  required: ["numericRangeValue"],
} satisfies JSONSchema

export const numericSliderRelativeChangeSchema = {
  type: "object",
  properties: {
    numericRangeValue: {
      title: "Relative Change",
      type: "number",
      minimum: -1.0,
      maximum: 10.0,
      multipleOf: 0.01,
    },
  },
  required: ["numericRangeValue"],
} satisfies JSONSchema

export const numericSliderFinalGradeSchema = {
  type: "object",
  properties: {
    numericRangeValue: {
      title: "Final Grade",
      type: "number",
      minimum: 0.0,
      maximum: 1.0,
      multipleOf: 0.01,
      default: 0.5,
    },
  },
  required: ["numericRangeValue"],
} satisfies JSONSchema

export const numericSliderDonateNowSchema = {
  type: "object",
  properties: {
    numericRangeValue: {
      type: "number",
      title: "Donate Now",
      minimum: 5.0,
      maximum: 1000.0,
      multipleOf: 5.0,
      default: 20.0,
    },
  },
} satisfies JSONSchema

export const numericSliderVerticalUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/numericRangeValue",
    },
  ],
} satisfies UISchema

export const numericSliderHorizontalUISchema = {
  type: "HorizontalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/numericRangeValue",
    },
  ],
} satisfies UISchema

export const numericSliderUSDUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/numericRangeValue",
      options: {
        addonBefore: "$",
      },
    },
  ],
} satisfies UISchema

export const numericSliderPercentageUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/numericRangeValue",
      options: {
        addonAfter: "%",
      },
    },
  ],
} satisfies UISchema

export const numericSliderTemperatureUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/numericRangeValue",
      options: {
        addonAfter: "°F",
      },
    },
  ],
} satisfies UISchema

export const numericSliderUISchemaWithRule = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/numericRangeValue",
      rule: {
        effect: RuleEffect.HIDE,
        condition: {},
      },
    },
  ],
} satisfies UISchema
