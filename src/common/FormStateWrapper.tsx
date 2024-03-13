import { JsonForms } from "@jsonforms/react"
import { JSONSchema } from "json-schema-to-ts"
import { Form } from "antd"

import { JsonSchema7 } from "@jsonforms/core"
import { UISchema } from "../ui-schema"
import { cellRegistryEntries, rendererRegistryEntries } from "../renderers"
import { useState } from "react"

type RenderProps<T extends Record<string, unknown>> = {
  schema: JSONSchema
  data?: T
  uischema?: UISchema
  onChange?: (result: { data: T }) => void
}

export function FormStateWrapper<T extends Record<string, unknown>>({
  schema,
  uischema,
  data: initialData,
  onChange,
}: RenderProps<T>) {
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
