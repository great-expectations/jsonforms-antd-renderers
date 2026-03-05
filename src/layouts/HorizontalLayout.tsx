import { LayoutProps, GroupLayout } from "@jsonforms/core"
import isEmpty from "lodash.isempty"
import { AntDLayout, AntDLayoutProps } from "./LayoutRenderer"
import { HorizontalLayoutUISchema } from "../ui-schema"
import { Form, Row } from "antd"
import { withJsonFormsLayoutProps } from "@jsonforms/react"

export const HORIZONTAL_LAYOUT_FORM_TEST_ID = "horizontal-layout-form"

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
  if (visible === false) {
    return null
  }

  const content = (
    <>
      {!isEmpty(groupLayout.label) && groupLayout.label}
      <Row
        justify="space-between"
        gutter={12}
        align="middle"
        style={{ maxWidth: "100%" }}
      >
        <AntDLayout
          {...childProps}
          direction="row"
          renderers={renderers}
          cells={cells}
        />
      </Row>
    </>
  )

  if (form) {
    return content
  }

  return <Form data-testid={HORIZONTAL_LAYOUT_FORM_TEST_ID}>{content}</Form>
}

export const HorizontalLayoutRenderer =
  withJsonFormsLayoutProps(HorizontalLayout)
