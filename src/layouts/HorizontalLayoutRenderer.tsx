import { LayoutProps, GroupLayout, rankWith, uiTypeIs } from "@jsonforms/core"
import isEmpty from "lodash.isEmpty"
import { AntDLayoutRenderer, AntDLayoutRendererProps } from "./LayoutRenderer"
import { HorizontalLayout } from "../ui-schema"
import { withJsonFormsLayoutProps } from "@jsonforms/react"
import { Form, Row } from "antd"

export const HorizontalLayoutRendererRegistryEntry = {
  tester: rankWith(2, uiTypeIs("HorizontalLayout")),
  renderer: withJsonFormsLayoutProps(HorizontalLayoutRenderer),
}

export function HorizontalLayoutRenderer({ uischema, schema, path, enabled, visible, renderers, cells }: LayoutProps) {
  const horizontalLayout = uischema as HorizontalLayout
  const groupLayout = uischema as GroupLayout
  const childProps: AntDLayoutRendererProps = {
    elements: horizontalLayout.elements,
    schema,
    path,
    enabled,
    visible,
  }
  const form = Form.useFormInstance()
  return (
    <Form component={form ? false : "form"} form={form}>
      {!isEmpty(groupLayout.label) && groupLayout.label}
      <Row justify="space-between" gutter={12}>
        <AntDLayoutRenderer {...childProps} direction="row" renderers={renderers} cells={cells} />
      </Row>
    </Form>
  )
}
