import { JSONSchema } from "json-schema-to-ts"
import { UISchema } from "../ui-schema"

export const horizontalAlignmentSchema = {
  type: "object",
  properties: {
    first_name: { type: "string", title: "First name" },
    last_name: { type: "string", title: "Last name" },
    color: {
      type: "string",
      title: "Color",
      enum: ["Red", "Green", "Blue"],
      default: "Red",
    },
    agree: { type: "boolean", title: "I agree", default: false },
  },
} satisfies JSONSchema

export const horizontalAlignmentUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "HorizontalLayout",
      elements: [
        { type: "Control", scope: "#/properties/first_name" },
        { type: "Control", scope: "#/properties/last_name" },
      ],
    },
    {
      type: "HorizontalLayout",
      elements: [
        { type: "Control", scope: "#/properties/color" },
        { type: "Control", scope: "#/properties/agree" },
      ],
    },
  ],
} satisfies UISchema<typeof horizontalAlignmentSchema>
