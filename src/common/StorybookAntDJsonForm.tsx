import {
  JsonFormsRendererRegistryEntry,
  JsonFormsUISchemaRegistryEntry,
  JsonSchema7,
  createAjv,
} from "@jsonforms/core";
import { UISchema } from "../ui-schema";
import { AntDJsonForm } from "./AntDJsonForm";
import { useState } from "react";

type Props = {
  data?: Record<string, unknown>;
  jsonSchema: JsonSchema7;
  rendererRegistryEntries: JsonFormsRendererRegistryEntry[];
  uiSchema?: UISchema;
  uiSchemaRegistryEntries?: JsonFormsUISchemaRegistryEntry[];
  config?: Record<string, unknown>;
};

// this component exists to facilitate storybook rendering
export function StorybookAntDJsonForm({
  data: initialData = {},
  uiSchema,
  jsonSchema,
  uiSchemaRegistryEntries,
  rendererRegistryEntries,
  config,
}: Props) {
  const [data, setData] = useState(initialData);
  return (
    <AntDJsonForm
      uiSchema={uiSchema}
      jsonSchema={jsonSchema}
      data={data}
      updateData={(newData) => setData(newData)}
      uiSchemaRegistryEntries={uiSchemaRegistryEntries}
      rendererRegistryEntries={rendererRegistryEntries}
      config={config}
    />
  );
}
