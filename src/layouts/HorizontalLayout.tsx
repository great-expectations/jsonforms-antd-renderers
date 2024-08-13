import { LayoutProps, GroupLayout } from "@jsonforms/core"
import isEmpty from "lodash.isempty"
import { AntDLayout, AntDLayoutProps } from "./LayoutRenderer"
import { HorizontalLayoutUISchema } from "../ui-schema"
import { Form, Row } from "antd"
import { withJsonFormsLayoutProps } from "@jsonforms/react"

export function HorizontalLayout({
  uischema,
  schema,
  path,
  enabled,
  visible,
  renderers,
  cells,
}: LayoutProps) {
  const horizontalLayout = uischema as HorizontalLayoutUISchema<unknown>
  const groupLayout = uischema as GroupLayout
  const childProps: AntDLayoutProps = {
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
        <AntDLayout
          {...childProps}
          direction="row"
          renderers={renderers}
          cells={cells}
        />
      </Row>
    </Form>
  )
}

export const HorizontalLayoutRenderer =
  withJsonFormsLayoutProps(HorizontalLayout)
