import { JSONSchema } from "json-schema-to-ts"
import { UISchema } from "../ui-schema"

export const dateTimeSchema = {
  type: "object",
  properties: {
    dateTime: {
      title: "Date Time",
      type: "string",
      format: "date-time",
    },
  },
  required: ["dateTime"],
} as const satisfies JSONSchema

export const dateTimeDefaultValueSchema = {
  type: "object",
  properties: {
    dateTime: {
      title: "Date Time",
      type: "string",
      format: "date-time",
      default: "2021-08-09 12:34:56",
    },
  },
} as const satisfies JSONSchema

export const dateTimeUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/dateTime",
      label: "Date Time",
    },
  ],
} satisfies UISchema<typeof dateTimeSchema>

export const dateTimeShowTimeUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/dateTime",
      label: "Date Time",
      options: {
        showTime: true,
      },
    },
  ],
} satisfies UISchema<typeof dateTimeSchema>

export const dateTimeShowMillisecondHideNowUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/dateTime",
      label: "Date Time",
      options: {
        showTime: true,
        showMillisecond: true,
        showNow: false,
      },
    },
  ],
} satisfies UISchema<typeof dateTimeSchema>

export const dateTimeOverrideDefaultFormatUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/dateTime",
      label: "Date Time",
      options: {
        format: {
          format: "MM/DD",
        },
      },
    },
  ],
} satisfies UISchema<typeof dateTimeSchema>
