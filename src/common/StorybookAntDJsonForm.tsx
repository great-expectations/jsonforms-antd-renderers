import {
  JsonFormsRendererRegistryEntry,
  JsonFormsUISchemaRegistryEntry,
} from "@jsonforms/core"
import { UISchema } from "../ui-schema"
import { AntDJsonForm } from "./AntDJsonForm"
import { useState } from "react"

type Props<T> = {
  data?: Record<string, unknown>
  jsonSchema: T
  rendererRegistryEntries: JsonFormsRendererRegistryEntry[]
  uiSchema?: UISchema<T>
  uiSchemaRegistryEntries?: JsonFormsUISchemaRegistryEntry[]
  config?: Record<string, unknown>
  onChange: (data: Record<string, unknown>) => void
}

// this component exists to facilitate storybook rendering
export function StorybookAntDJsonForm<T>({
  data: initialData = {},
  uiSchema,
  jsonSchema,
  uiSchemaRegistryEntries,
  rendererRegistryEntries,
  config,
  onChange,
}: Props<T>) {
  const [data, setData] = useState(initialData)
  const updateData = (newData: Record<string, unknown>) => {
    setData(newData)
    onChange(newData)
  }
  return (
    <AntDJsonForm<typeof jsonSchema>
      uiSchema={uiSchema}
      jsonSchema={jsonSchema}
      data={data}
      updateData={(newData) => updateData(newData)}
      uiSchemaRegistryEntries={uiSchemaRegistryEntries}
      rendererRegistryEntries={rendererRegistryEntries}
      config={config}
    />
  )
}
