import type {
  ControlElement,
  ControlProps,
  RendererProps,
} from "@jsonforms/core"
import { Col, Form, Row } from "antd"
import type { Rule } from "antd/es/form"
import { InputNumber } from "../antd/InputNumber"
import { Slider } from "../antd/Slider"
import { ControlUISchema } from "../ui-schema"
import { withJsonFormsControlProps } from "@jsonforms/react"

export const NumericSliderControl = (props: ControlProps & RendererProps) => {
  if (!props.visible) return null

  const initialValue =
    typeof props.schema.default === "number"
      ? props.schema.default
      : props.schema.minimum

  const rules: Rule[] = [
    { required: props.required, message: `${props.label} is required` },
  ]

  const uiSchema = props.uischema as ControlUISchema<unknown> | ControlElement
  const formItemProps =
    "formItemProps" in uiSchema ? uiSchema.formItemProps : {}

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
      <Row>
        <Col span={8}>{Slider({ ...props })}</Col>
        <Col span={7}>{InputNumber({ ...props })}</Col>
      </Row>
    </Form.Item>
  )
}

export const NumericSliderRenderer =
  withJsonFormsControlProps(NumericSliderControl)
