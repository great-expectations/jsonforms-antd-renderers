import {
  JsonFormsRendererRegistryEntry,
  JsonFormsUISchemaRegistryEntry,
  JsonSchema7,
} from "@jsonforms/core"
import { UISchema } from "../ui-schema"
import { AntDJsonForm } from "./AntDJsonForm"
import { useState } from "react"
import { JSONSchema } from "json-schema-to-ts"

type Props = {
  data?: Record<string, unknown>
  jsonSchema: JSONSchema
  rendererRegistryEntries: JsonFormsRendererRegistryEntry[]
  uiSchema?: UISchema
  uiSchemaRegistryEntries?: JsonFormsUISchemaRegistryEntry[]
  config?: Record<string, unknown>
  onChange: (data: Record<string, unknown>) => void
}

// this component exists to facilitate storybook rendering
export function StorybookAntDJsonForm({
  data: initialData = {},
  uiSchema,
  jsonSchema,
  uiSchemaRegistryEntries,
  rendererRegistryEntries,
  config,
  onChange,
}: Props) {
  const [data, setData] = useState(initialData)
  const updateData = (newData: Record<string, unknown>) => {
    setData(newData)
    onChange(newData)
  }
  return (
    <AntDJsonForm
      uiSchema={uiSchema}
      jsonSchema={jsonSchema as JsonSchema7}
      data={data}
      updateData={(newData) => updateData(newData)}
      uiSchemaRegistryEntries={uiSchemaRegistryEntries}
      rendererRegistryEntries={rendererRegistryEntries}
      config={config}
    />
  )
}
