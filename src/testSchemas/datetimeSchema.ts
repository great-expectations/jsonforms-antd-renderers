export const sampleDatetimeSchema = {
  title: "The Future is Now",
  type: "string",
  format: "date-time",
} as const

export const datetimeSchema = {
  title: "The Future is Now",
  type: "string",
  format: "date-time",
  scope: "#/properties/The Future is Now",
} as const

export const datetimeUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#",
    },
  ],
} as const

export const datetimeUISchemaWithRule = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#",
      rule: {
        effect: "HIDE",
        condition: {},
      },
    },
  ],
} as const
