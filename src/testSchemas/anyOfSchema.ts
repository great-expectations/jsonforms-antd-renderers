import {
  JsonFormsUISchemaRegistryEntry,
  JsonSchema,
  RuleEffect,
} from "@jsonforms/core"
import { UISchema } from "../ui-schema"
import { JSONSchema } from "json-schema-to-ts"

const splitterUISchema: UISchema<
  typeof splitterAnyOfJsonSchema.definitions.SplitterYear
> = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/column_name",
      label: "Column of datetime type",
    },
    {
      type: "Control",
      scope: "#/properties/method_name",
      rule: {
        effect: RuleEffect.HIDE,
        condition: {},
      },
    },
  ],
}

export const SplitterUISchemaRegistryEntry: JsonFormsUISchemaRegistryEntry = {
  uischema: splitterUISchema,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  tester: (schema: JsonSchema, schemaPath: string, _path: string) => {
    const shouldApply: boolean =
      typeof schema.const === "string" && schema.const?.startsWith("Splitter")
    const rank =
      (shouldApply || schema.title?.startsWith("Splitter")) &&
      schemaPath === "#/properties/splitter"
        ? 2
        : -1
    return rank
  },
}

export const splitterAnyOfJsonSchema = {
  type: "object",
  properties: {
    splitter: {
      title: "Splitter",
      anyOf: [
        {
          $ref: "#/definitions/SplitterYear",
        },
        {
          $ref: "#/definitions/SplitterYearAndMonth",
        },
        {
          $ref: "#/definitions/SplitterYearAndMonthAndDay",
        },
      ],
    },
  },
  definitions: {
    SplitterYear: {
      title: "SplitterYear",
      type: "object",
      properties: {
        column_name: {
          title: "Column Name",
          type: "string",
        },
        method_name: {
          title: "Method Name",
          default: "split_on_year",
          enum: ["split_on_year"],
          type: "string",
        },
      },
      required: ["column_name"],
      additionalProperties: false,
    },
    SplitterYearAndMonth: {
      title: "SplitterYearAndMonth",
      type: "object",
      properties: {
        column_name: {
          title: "Column Name",
          type: "string",
        },
        method_name: {
          title: "Method Name",
          default: "split_on_year_and_month",
          enum: ["split_on_year_and_month"],
          type: "string",
        },
      },
      required: ["column_name"],
      additionalProperties: false,
    },
    SplitterYearAndMonthAndDay: {
      title: "SplitterYearAndMonthAndDay",
      type: "object",
      properties: {
        column_name: {
          title: "Column Name",
          type: "string",
        },
        method_name: {
          title: "Method Name",
          default: "split_on_year_and_month_and_day",
          enum: ["split_on_year_and_month_and_day"],
          type: "string",
        },
      },
      required: ["column_name"],
      additionalProperties: false,
    },
  },
  required: ["splitter"],
  additionalProperties: false,
} satisfies JSONSchema

export const AnyOfWithDefaultsSchema = {
  type: "object",
  properties: {
    contactMethod: {
      title: "Contact Method",
      anyOf: [
        {
          title: "Smoke Signal",
          type: "object",
          required: ["pattern", "method"],
          additionalProperties: false,
          properties: {
            pattern: { type: "string" },
            method: {
              default: "smokesignal",
              enum: ["smokesignal"],
              type: "string",
            },
          },
        },
        {
          title: "Phone",
          type: "object",
          required: ["phoneNumber", "method"],
          additionalProperties: false,
          properties: {
            phoneNumber: { type: "string" },
            method: {
              default: "phone",
              enum: ["phone"],
              type: "string",
            },
          },
        },
      ],
    },
  },
  required: ["contactMethod"],
  additionalProperties: false,
} as const satisfies JSONSchema

export const AnyOfWithDefaultsBaseUISchema = {
  type: "VerticalLayout",
  elements: [{ type: "Control", scope: "#/properties/contactMethod" }],
} satisfies UISchema<typeof AnyOfWithDefaultsSchema>

export const AnyOfTooltipUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/contactMethod",
      options: { tooltip: "Choose wisely" },
    },
  ],
} satisfies UISchema<typeof AnyOfWithDefaultsSchema>

const AnyOfWithDefaultsUISchema1 = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/pattern",
      label: "Pattern",
    },
    {
      type: "Control",
      scope: "#/properties/method",
      rule: {
        effect: RuleEffect.HIDE,
        condition: {},
      },
    },
  ],
} satisfies UISchema<
  (typeof AnyOfWithDefaultsSchema.properties.contactMethod.anyOf)[0]
>
const AnyOfWithDefaultsUISchema2 = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/phoneNumber",
      label: "Phone Number",
    },
    {
      type: "Control",
      scope: "#/properties/method",
      rule: {
        effect: RuleEffect.HIDE,
        condition: {},
      },
    },
  ],
} satisfies UISchema<
  (typeof AnyOfWithDefaultsSchema.properties.contactMethod.anyOf)[1]
>

export const AnyOfWithDefaultsUISchemaRegistryEntries = [
  {
    uischema: AnyOfWithDefaultsUISchema1,
    tester: (schema: JsonSchema) =>
      schema.title?.startsWith("Smoke") ? 2 : -1,
  },
  {
    uischema: AnyOfWithDefaultsUISchema2,
    tester: (schema: JsonSchema) =>
      schema.title?.startsWith("Phone") ? 2 : -1,
  },
]
