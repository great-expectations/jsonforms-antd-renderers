import { JsonForms } from "@jsonforms/react";
import {
  JsonFormsRendererRegistryEntry,
  JsonFormsUISchemaRegistryEntry,
  JsonSchema7,
  createAjv,
} from "@jsonforms/core";
import { UISchema } from "../ui-schema";
import { rendererRegistryEntries as _rendererRegistryEntries, cellRegistryEntries } from "../renderers";

type Props = {
  data: Record<string, unknown>;
  updateData: (
    data: Record<string, unknown>,
    areCdmDateTimesEnabled?: boolean
  ) => void;
  jsonSchema: JsonSchema7;
  uiSchema?: UISchema;
  uiSchemaRegistryEntries?: JsonFormsUISchemaRegistryEntry[];
  customRendererRegistryEntries?: JsonFormsRendererRegistryEntry[];
  rendererRegistryEntries?: JsonFormsRendererRegistryEntry[];
  config?: Record<string, unknown>;
};

export function AntDJsonForm({
  uiSchema,
  jsonSchema,
  data,
  updateData,
  uiSchemaRegistryEntries,
  customRendererRegistryEntries,
  rendererRegistryEntries = _rendererRegistryEntries,
  config,
}: Props) {
  const handleDefaultsAjv = createAjv({ useDefaults: true });

  return (
    <JsonForms
      schema={jsonSchema as JsonSchema7} // bleh
      uischema={uiSchema}
      uischemas={uiSchemaRegistryEntries ?? []}
      data={data}
      onChange={({ data }) => updateData(data)}
      cells={[...cellRegistryEntries]}
      renderers={[
        ...rendererRegistryEntries,
        ...(customRendererRegistryEntries ?? []),
      ]}
      config={config}
      ajv={handleDefaultsAjv}
    />
  );
}
