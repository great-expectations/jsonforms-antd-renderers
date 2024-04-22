import {
  JsonFormsUISchemaRegistryEntry,
  JsonSchema,
  RuleEffect,
} from "@jsonforms/core"
import { SnowflakeDataSourceJsonSchema } from "./splitter-json-schema"
import { UISchema } from "../../ui-schema"

const splitterUISchema: UISchema<
  typeof SnowflakeDataSourceJsonSchema.definitions.SplitterYear
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

// TODO: actually use this or reuse common component
export const SplitterUISchemaRegistryEntry2: JsonFormsUISchemaRegistryEntry = {
  uischema: splitterUISchema,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  tester: (schema: JsonSchema, schemaPath: string, path: string) => {
    const rank =
      schema.title?.startsWith("Splitter") &&
      schemaPath === "#/properties/splitter"
        ? 2
        : -1
    // console.log("SplitterUISchema Tester", { rank, schema, schemaPath, path })
    return rank
  },
}

export const SnowflakeDataSourcePage2UISchema: UISchema<
  typeof SnowflakeDataSourceJsonSchema
> = {
  type: "VerticalLayout",
  elements: [
    {
      label: "Data Asset",
      type: "Control",
      scope: "#/properties/assets",
    },
  ],
}
