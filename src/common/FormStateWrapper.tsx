/* eslint-disable @typescript-eslint/no-misused-promises */
import { JsonForms } from "@jsonforms/react"
import { Button, Form } from "antd"

import { JsonFormsUISchemaRegistryEntry, JsonSchema7 } from "@jsonforms/core"
import { UISchema } from "../ui-schema"
import {
  cellRegistryEntries,
  rendererRegistryEntries,
} from "../renderer-registry-entries"
import { useCallback, useState } from "react"

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
  const [form] = Form.useForm()
  const onSubmit = useCallback(async () => {
    const formValidationResult = await form
      .validateFields()
      .then((values: Record<string, unknown>) => values)
      .catch((errorInfo: { errorFields: unknown[] }) => errorInfo)

    if ("errorFields" in formValidationResult) {
      return // nothing to do; validateFields will have already rendered error messages on form fields
    }
    // api call to save form data goes here
  }, [form])

  return (
    <Form form={form}>
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
      <Form.Item>
        <Button type="primary" onClick={onSubmit}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
