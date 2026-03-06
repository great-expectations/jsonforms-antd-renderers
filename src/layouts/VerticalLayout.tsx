import { LayoutProps } from "@jsonforms/core"
import { AntDLayout, AntDLayoutProps } from "./LayoutRenderer"
import { Form } from "antd"
import { VerticalLayoutUISchema } from "../ui-schema"
import { withJsonFormsLayoutProps } from "@jsonforms/react"

export const VERTICAL_LAYOUT_FORM_TEST_ID = "vertical-layout-form"

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

  if (visible === false) {
    return null
  }

  const content = (
    <AntDLayout {...childProps} renderers={renderers} cells={cells} />
  )

  if (form) {
    return content
  }

  return (
    <Form data-testid={VERTICAL_LAYOUT_FORM_TEST_ID} scrollToFirstError>
      {content}
    </Form>
  )
}

export const VerticalLayoutRenderer = withJsonFormsLayoutProps(VerticalLayout)
