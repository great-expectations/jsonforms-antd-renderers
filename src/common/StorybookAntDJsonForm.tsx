/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  JsonFormsRendererRegistryEntry,
  JsonFormsUISchemaRegistryEntry,
} from "@jsonforms/core"
import { UISchema } from "../ui-schema"
import { AntDJsonForm } from "./AntDJsonForm"
import { useCallback, useState } from "react"
import { Button, Form } from "antd"

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
  const [form] = Form.useForm()
  const onSubmit = useCallback(async () => {
    const formValidationResult = await form
      .validateFields()
      .then((values: Record<string, unknown>) => values)
      .catch((errorInfo: { errorFields: unknown[] }) => errorInfo)

    if ("errorFields" in formValidationResult) {
      console.log(formValidationResult)
      return // nothing to do; validateFields will have already rendered error messages on form fields
    }
    // api call to save form data goes here
  }, [form])
  return (
    <Form form={form}>
      <AntDJsonForm<typeof jsonSchema>
        uiSchema={uiSchema}
        jsonSchema={jsonSchema}
        data={data}
        updateData={(newData) => updateData(newData)}
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
