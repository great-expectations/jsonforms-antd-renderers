import type { ControlProps as JSFControlProps } from "@jsonforms/core"
import { Col, Form } from "antd"
import type { Rule } from "antd/es/form"
import { InputNumber } from "../antd/InputNumber"
import { ControlUISchema } from "../ui-schema"
import { withJsonFormsControlProps } from "@jsonforms/react"

type ControlProps = Omit<JSFControlProps, "uischema"> & {
  uischema: ControlUISchema<unknown> | JSFControlProps["uischema"]
}

export const NumericControl = (props: ControlProps) => {
  if (!props.visible) return null

  console.log("NumericControl props:", {
    data: props.data,
    schemaDefault: props.schema.default,
    path: props.path,
    label: props.label
  })

  const initialValue = (props.data as number | undefined) ?? props.schema.default

  console.log("NumericControl initialValue:", initialValue)

  const rules: Rule[] = [
    { required: props.required, message: `${props.label} is required` },
  ]

  const formItemProps =
    "formItemProps" in props.uischema ? props.uischema.formItemProps : {}

  return (
    <Form.Item
      label={props.label}
      id={props.id}
      name={props.path}
      required={props.required}
      initialValue={initialValue}
      rules={rules}
      validateTrigger={["onBlur"]}
      {...formItemProps}
    >
      <Col>{InputNumber({ ...props })}</Col>
    </Form.Item>
  )
}

export const NumericRenderer = withJsonFormsControlProps(NumericControl)
