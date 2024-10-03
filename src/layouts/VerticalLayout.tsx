import { LayoutProps, GroupLayout } from "@jsonforms/core"
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
  const verticalLayout = uischema as VerticalLayoutUISchema<unknown>
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
    <Form component={form ? false : "form"} scrollToFirstError form={form}>
      {!!groupLayout.label && (
        <div>{groupLayout.label}</div> // this was SubtitleSemiBold
      )}
      <AntDLayout {...childProps} renderers={renderers} cells={cells} />
    </Form>
  )
}

export const VerticalLayoutRenderer = withJsonFormsLayoutProps(VerticalLayout)
