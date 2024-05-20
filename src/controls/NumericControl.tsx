import type {
  ControlElement,
  ControlProps,
  RendererProps,
} from "@jsonforms/core"
import { Col, Form } from "antd"
import type { Rule } from "antd/es/form"
import { InputNumber } from "../antd/InputNumber"
import { ControlUISchema } from "../ui-schema"
import { withJsonFormsControlProps } from "@jsonforms/react"

type NumericControlProps = ControlProps & RendererProps & {
  uischema: ControlUISchema<unknown> | ControlElement
}

export const NumericControl = (props: NumericControlProps) => {
  if (!props.visible) return null

  const initialValue =
    typeof props.schema.default === "number" ? props.schema.default : undefined

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
      <Col span={18}>{InputNumber({ ...props })}</Col>
    </Form.Item>
  )
}

export const NumericRenderer = withJsonFormsControlProps(NumericControl)
