import { JSONSchema } from "json-schema-to-ts";

export const SnowflakeDataSourceJsonSchema = {
  type: "object",
  properties: {
    assets: {
      title: "Assets",
      default: [],
      type: "array",
      items: {
        oneOf: [
          {
            $ref: "#/definitions/TableAsset",
          },
          {
            $ref: "#/definitions/QueryAsset",
          },
        ],
      },
    },
  },
  additionalProperties: false,
  definitions: {
    Sorter: {
      title: "Sorter",
      type: "object",
      properties: {
        key: {
          title: "Key",
          type: "string",
        },
        reverse: {
          title: "Reverse",
          default: false,
          type: "boolean",
        },
      },
      required: ["key"],
    },
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
      // "description": "Base model for most fluent datasource related pydantic models.\n\nAdds yaml dumping and parsing methods.\n\nExtra fields are not allowed.\n\nSerialization methods default to `exclude_unset = True` to prevent serializing\nconfigs full of mostly unset default values.\nAlso prevents passing along unset kwargs to BatchSpec.\nhttps://docs.pydantic.dev/usage/exporting_models/",
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
    TableAsset: {
      title: "TableAsset",
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
      required: ["splitter"],
      additionalProperties: false,
    },
    QueryAsset: {
      title: "QueryAsset",
      description: "--Public API--",
      type: "object",
      properties: {
        name: {
          title: "Name",
          type: "string",
        },
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
      required: ["name", "splitter"],
      additionalProperties: false,
    },
  },
  required: [],
} as const satisfies JSONSchema
