import { LayoutProps } from "@jsonforms/core"
import { AntDLayout, AntDLayoutProps } from "./LayoutRenderer"
import { Form } from "antd"
import { VerticalLayoutUISchema } from "../ui-schema"
import { withJsonFormsLayoutProps } from "@jsonforms/react"

export function VerticalLayout({
  uischema,
  schema,
  path,
  enabled,
  visible,
  renderers,
  cells,
}: LayoutProps) {
  const { elements } = uischema as VerticalLayoutUISchema<unknown>
  const childProps: AntDLayoutProps = {
    elements,
    schema,
    path,
    enabled,
    visible,
  }
  const form = Form.useFormInstance()
  return (
    <Form component={form ? false : "form"} scrollToFirstError form={form}>
      <AntDLayout {...childProps} renderers={renderers} cells={cells} />
    </Form>
  )
}

export const VerticalLayoutRenderer = withJsonFormsLayoutProps(VerticalLayout)
