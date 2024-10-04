import { JSONSchema } from "json-schema-to-ts"
import { UISchema } from "../ui-schema"

export const enumSizeSchema = {
  type: "object",
  properties: {
    size: {
      title: "Size",
      type: "string",
      enum: ["XS", "S", "M", "L", "XL"],
      default: "M",
    },
  },
  required: ["size"],
} satisfies JSONSchema

export const enumProfessionSchema = {
  type: "object",
  properties: {
    profession: {
      title: "Profession",
      type: "string",
      enum: [
        "Footballer",
        "Bob Ross Impersonator",
        "Beat Boxer",
        "Software Engineer",
      ],
    },
  },
  required: ["profession"],
} satisfies JSONSchema

export const enumPSISchema = {
  type: "object",
  properties: {
    psi: {
      title: "Approximate PSI",
      type: "integer",
      enum: [100, 1000, 10000],
    },
  },
} satisfies JSONSchema

export const enumSnakeCaseSchema = {
  type: "object",
  properties: {
    humanReadableOptions: {
      title: "Human Readable Options",
      type: "string",
      enum: ["option_1", "option_2", "option_3"],
    },
  },
} satisfies JSONSchema

export const enumSizeUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/size",
      options: { optionType: "segmented" },
      layoutProps: {
        columns: undefined,
      },
    },
  ],
} satisfies UISchema<typeof enumSizeSchema>

export const enumProfessionUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/profession",
      options: { optionType: "dropdown" },
      layoutProps: {
        columns: undefined,
      },
    },
  ],
} satisfies UISchema<typeof enumProfessionSchema>

export const enumPSIUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/psi",
      options: { optionType: "radio" },
      layoutProps: {
        columns: undefined,
      },
    },
  ],
} satisfies UISchema<typeof enumPSISchema>

export const enumSnakeCaseUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/humanReadableOptions",
      options: {
        optionType: "dropdown",
        enumValueToLabelMap: {
          option_1: "Option 1",
          option_2: "Option 2",
          option_3: "Option 3",
        },
      },
      layoutProps: {
        columns: undefined,
      },
    },
  ],
} satisfies UISchema<typeof enumSnakeCaseSchema>
