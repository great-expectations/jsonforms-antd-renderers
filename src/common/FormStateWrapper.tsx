import { JsonForms } from "@jsonforms/react"
import { Form } from "antd"

import { JsonFormsUISchemaRegistryEntry, JsonSchema7 } from "@jsonforms/core"
import { UISchema } from "../ui-schema"
import {
  cellRegistryEntries,
  rendererRegistryEntries,
} from "../renderer-registry-entries"
import { useState } from "react"

export type RenderProps<T extends Record<string, unknown>, S> = {
  schema: S
  data?: T
  uischema?: UISchema<S>
  onChange?: (result: { data: T }) => void
  uiSchemaRegistryEntries?: JsonFormsUISchemaRegistryEntry[]
}

export function FormStateWrapper<T extends Record<string, unknown>, S>({
  schema,
  uischema,
  data: initialData,
  onChange,
  uiSchemaRegistryEntries,
}: RenderProps<T, S>) {
  const [data, setData] = useState<Record<string, unknown> | undefined>(
    initialData,
  )
  return (
    <Form>
      <JsonForms
        schema={schema as JsonSchema7}
        uischema={uischema}
        renderers={rendererRegistryEntries}
        cells={cellRegistryEntries}
        data={data}
        uischemas={uiSchemaRegistryEntries ?? []}
        {...(onChange
          ? { onChange }
          : {
              onChange: (result) =>
                setData(result.data as Record<string, unknown>),
            })}
      />
    </Form>
  )
}
