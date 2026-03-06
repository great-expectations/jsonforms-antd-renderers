import { LayoutProps, GroupLayout } from "@jsonforms/core"
import isEmpty from "lodash.isempty"
import { AntDLayout, AntDLayoutProps } from "./LayoutRenderer"
import { HorizontalLayoutUISchema } from "../ui-schema"
import { Form, Row } from "antd"
import { withJsonFormsLayoutProps } from "@jsonforms/react"
import { useParentFormLayout } from "../hooks/useParentFormLayout"

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
  const { ref, layout } = useParentFormLayout()

  if (visible === false) {
    return null
  }

  const content = (
    <>
      {!isEmpty(groupLayout.label) && groupLayout.label}
      <Row
        justify="space-between"
        gutter={12}
        align="bottom"
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

  return (
    <>
      <span ref={ref} style={{ display: "none" }} />
      <Form
        data-testid={HORIZONTAL_LAYOUT_FORM_TEST_ID}
        component={form ? false : "form"}
        layout={layout}
        form={form}
      >
        {content}
      </Form>
    </>
  )
}

export const HorizontalLayoutRenderer =
  withJsonFormsLayoutProps(HorizontalLayout)
