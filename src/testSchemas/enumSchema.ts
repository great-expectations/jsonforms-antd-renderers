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

export const enumSizeUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/size",
      options: { optionType: "segmented" },
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
    },
  ],
} satisfies UISchema<typeof enumPSISchema>
