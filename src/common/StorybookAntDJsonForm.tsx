/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  JsonFormsRendererRegistryEntry,
  JsonFormsUISchemaRegistryEntry,
} from "@jsonforms/core"
import { UISchema } from "../ui-schema"
import { AntDJsonForm } from "./AntDJsonForm"
import { useCallback, useState } from "react"
import { Button, Form } from "antd"
import { JsonFormsReactProps } from "@jsonforms/react"

type Props<T> = {
  data?: Record<string, unknown>
  jsonSchema: T
  rendererRegistryEntries: JsonFormsRendererRegistryEntry[]
  uiSchema?: UISchema<T>
  uiSchemaRegistryEntries?: JsonFormsUISchemaRegistryEntry[]
  config?: Record<string, unknown>
  onChange: JsonFormsReactProps["onChange"]
}

// this component exists to facilitate storybook rendering
export function StorybookAntDJsonForm<T>({
  data: initialData = {},
  uiSchema,
  jsonSchema,
  uiSchemaRegistryEntries,
  rendererRegistryEntries,
  config,
  onChange: _onChange,
}: Props<T>) {
  const [result, setResult] = useState({ data: initialData })
  const onChange = useCallback(
    (r: { data: Record<string, unknown>; errors: [] }) => {
      setResult(r)
      _onChange?.(r)
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
  console.log(
    "xxxx jsonforms StorybookAntDJsonForm state:",
    form.getFieldsValue(),
  )
  return (
    <Form form={form}>
      <AntDJsonForm<typeof jsonSchema>
        uiSchema={uiSchema}
        jsonSchema={jsonSchema}
        data={result.data}
        onChange={onChange}
        uiSchemaRegistryEntries={uiSchemaRegistryEntries}
        rendererRegistryEntries={rendererRegistryEntries}
        config={config}
      />
      <Form.Item>
        <Button type="primary" onClick={onSubmit}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
