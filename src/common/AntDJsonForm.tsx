import { JsonForms } from "@jsonforms/react"
import {
  JsonFormsRendererRegistryEntry,
  JsonFormsUISchemaRegistryEntry,
  JsonSchema7,
} from "@jsonforms/core"
import { UISchema } from "../ui-schema"
import {
  rendererRegistryEntries as _rendererRegistryEntries,
  cellRegistryEntries,
} from "../renderer-registry-entries"

type Props<T> = {
  data: Record<string, unknown>
  updateData: (data: Record<string, unknown>) => void
  jsonSchema: T
  uiSchema?: UISchema<T>
  uiSchemaRegistryEntries?: JsonFormsUISchemaRegistryEntry[]
  customRendererRegistryEntries?: JsonFormsRendererRegistryEntry[]
  rendererRegistryEntries?: JsonFormsRendererRegistryEntry[]
  config?: Record<string, unknown>
}

export function AntDJsonForm<T = Record<string, unknown>>({
  uiSchema,
  jsonSchema,
  data,
  updateData,
  uiSchemaRegistryEntries,
  customRendererRegistryEntries,
  rendererRegistryEntries = _rendererRegistryEntries,
  config,
}: Props<T>) {
  return (
    <JsonForms
      schema={jsonSchema as JsonSchema7}
      uischema={uiSchema}
      uischemas={uiSchemaRegistryEntries ?? []}
      data={data}
      onChange={({ data }) => updateData(data as Record<string, unknown>)}
      cells={[...cellRegistryEntries]}
      renderers={[
        ...rendererRegistryEntries,
        ...(customRendererRegistryEntries ?? []),
      ]}
      config={config}
    />
  )
}
