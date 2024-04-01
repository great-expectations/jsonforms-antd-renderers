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
      title: "Year",
      const: "SplitterYear",
      // "description": "Base model for most fluent datasource related pydantic models.\n\nAdds yaml dumping and parsing methods.\n\nExtra fields are not allowed.\n\nSerialization methods default to `exclude_unset = True` to prevent serializing\nconfigs full of mostly unset default values.\nAlso prevents passing along unset kwargs to BatchSpec.\nhttps://docs.pydantic.dev/usage/exporting_models/",
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
      const: "SplitterYearAndMonth",
      title: "Year - Month",
      // "description": "Base model for most fluent datasource related pydantic models.\n\nAdds yaml dumping and parsing methods.\n\nExtra fields are not allowed.\n\nSerialization methods default to `exclude_unset = True` to prevent serializing\nconfigs full of mostly unset default values.\nAlso prevents passing along unset kwargs to BatchSpec.\nhttps://docs.pydantic.dev/usage/exporting_models/",
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
      const: "SplitterYearAndMonthAndDay",
      title: "Year - Month - Day",
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
