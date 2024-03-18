import type { ControlProps, RendererProps } from "@jsonforms/core"
import { Col, Form } from "antd"
import type { Rule } from "antd/es/form"
import { InputNumber } from "../antd/InputNumber"

export const NumericControl = (props: ControlProps & RendererProps) => {
  if (!props.visible) return null

  const initialValue =
    typeof props.schema.default === "number" ? props.schema.default : undefined

  const rules: Rule[] = [
    { required: props.required, message: `${props.label} is required` },
  ]

  return (
    <Form.Item
      label={props.label}
      id={props.id}
      name={props.path}
      required={props.required}
      initialValue={initialValue}
      rules={rules}
      validateTrigger={["onBlur"]}
    >
      <Col span={18}>{InputNumber({ ...props })}</Col>
    </Form.Item>
  )
}
