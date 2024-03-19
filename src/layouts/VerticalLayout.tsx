import { LayoutProps, GroupLayout } from "@jsonforms/core"
import { AntDLayout, AntDLayoutProps } from "./LayoutRenderer"
import { Form, FormInstance, FormProps } from "antd"
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
  const verticalLayout = uischema as VerticalLayoutUISchema
  const groupLayout = uischema as GroupLayout
  const childProps: AntDLayoutProps = {
    elements: verticalLayout.elements,
    schema,
    path,
    enabled,
    visible,
  }
  const form = Form.useFormInstance()
  return (
    <Form {...getFormLayoutOptions(form)} form={form}>
      {!groupLayout.label && (
        <div>{groupLayout.label}</div> // this was SubtitleSemiBold
      )}
      <AntDLayout {...childProps} renderers={renderers} cells={cells} />
    </Form>
  )
}

function getFormLayoutOptions(form: FormInstance): Partial<FormProps> {
  return {
    scrollToFirstError: true,
    component: form ? "div" : "form",
  }
}

export const VerticalLayoutRenderer = withJsonFormsLayoutProps(VerticalLayout)
