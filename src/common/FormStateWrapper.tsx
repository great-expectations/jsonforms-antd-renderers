/* eslint-disable @typescript-eslint/no-misused-promises */
import { JsonForms, JsonFormsReactProps } from "@jsonforms/react"
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
  onChange?: JsonFormsReactProps["onChange"]
  uiSchemaRegistryEntries?: JsonFormsUISchemaRegistryEntry[]
}

export function FormStateWrapper<T extends Record<string, unknown>, S>({
  schema,
  uischema,
  data: initialData,
  onChange: _onChange,
  uiSchemaRegistryEntries,
}: RenderProps<T, S>) {
  const [result, setResult] = useState({
    data: initialData,
  })
  const onChange: Required<JsonFormsReactProps>["onChange"] = useCallback(
    (r) => {
      _onChange?.(r)
      setResult(r)
    },
    [_onChange],
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
  }, [form])
  console.log("xxxx jsonforms FormStateWrapper state:", form.getFieldsValue())

  return (
    <Form form={form}>
      <JsonForms
        schema={schema as JsonSchema7}
        uischema={uischema}
        renderers={rendererRegistryEntries}
        cells={cellRegistryEntries}
        data={result?.data}
        uischemas={uiSchemaRegistryEntries ?? []}
        onChange={onChange}
      />
      <Form.Item>
        <Button type="primary" onClick={onSubmit}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
