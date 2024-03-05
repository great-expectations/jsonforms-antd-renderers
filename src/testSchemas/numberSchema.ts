import { RuleEffect } from "@jsonforms/core"
import { JSONSchema } from "json-schema-to-ts"
import { UISchema } from "../ui-schema"

export const numberMagnitudeSchema = {
  type: "object",
  properties: {
    magnitude: {
      title: "Magnitude",
      type: "number",
    },
  },
  required: ["magnitude"],
} satisfies JSONSchema

export const numberTheNumberSchema = {
  type: "number",
  properties: {
    theNumber: {
      title: "The Number",
      type: "number",
      default: 42.42,
    },
  },
  required: ["theNumber"],
} satisfies JSONSchema

export const numberWeightSchema = {
  type: "object",
  properties: {
    weight: {
      title: "Weight",
      type: "number",
    },
  },
} satisfies JSONSchema

export const numberPriceSchema = {
  type: "object",
  properties: {
    price: {
      title: "Price",
      type: "number",
    },
  },
  required: ["price"],
} satisfies JSONSchema

export const numberBasisPointsSchema = {
  type: "number",
  title: "Basis Points",
  minimum: 0,
  maximum: 10000,
  multipleOf: 1,
} satisfies JSONSchema

export const numberTemperatureSchema = {
  type: "number",
  title: "Today's Temperature",
  minimum: -50,
  maximum: 150,
  default: 70,
  multipleOf: 1,
} satisfies JSONSchema

export const numberHumiditySchema = {
  type: "number",
  title: "Humidity",
  minimum: 0.0,
  maximum: 1.0,
} satisfies JSONSchema

export const numberRelativeChangeSchema = {
  type: "number",
  title: "Relative Change",
  minimum: -1.0,
  maximum: 10.0,
  default: 0.0,
  multipleOf: 0.01,
} satisfies JSONSchema

export const numberFinalGradeSchema = {
  type: "number",
  title: "Final Grade",
  minimum: 0.0,
  maximum: 1.0,
  default: 0.5,
} satisfies JSONSchema


export const numberDonateNowSchema = {
  type: "object",
  properties: {
    donateNow: {
      type: "number",
      title: "Donate Now",
      minimum: 5.00,
      maximum: 1000.00,
      default: 20.00,
      multipleOf: 5.00,
    }
  },
  required: ["donateNow"],
} satisfies JSONSchema


export const numberMagnitudeUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/magnitude",
    },
  ],
} satisfies UISchema

export const numberPriceUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/price",
      options: {
        addonBefore: "$",
      }
    },
  ],
} satisfies UISchema

export const numberTheNumberUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/theNumber",
    },
  ],
} satisfies UISchema


export const numberWeightUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/weight",
    },
  ],
} satisfies UISchema


export const numberMinMaxUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#",
    },
  ],
} satisfies UISchema


export const numberPercentageUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#",
      options: {
        addonAfter: "%",
      }
    },
  ],
} satisfies UISchema

export const numberTemperatureUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#",
      options: {
        addonAfter: "°F",
      }
    },
  ],
} satisfies UISchema

export const numberDonateNowUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/donateNow",
      options: {
        addonBefore: "$",
      }
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