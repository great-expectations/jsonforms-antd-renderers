import { LayoutProps, GroupLayout } from "@jsonforms/core"
import isEmpty from "lodash.isempty"
import { AntDLayoutRenderer, AntDLayoutRendererProps } from "./LayoutRenderer"
import { HorizontalLayout } from "../ui-schema"
import { Form, Row } from "antd"

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
