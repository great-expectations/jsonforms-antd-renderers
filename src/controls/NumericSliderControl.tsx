import type { ControlProps, RendererProps } from "@jsonforms/core"
import { Col, Form, Row } from "antd"
import type { Rule } from "antd/es/form"
import { InputNumber } from "../antd/InputNumber"
import { Slider } from "../antd/Slider"
import type { NumericControlOptions } from "../ui-schema"
import { QuestionCircleOutlined } from "@ant-design/icons"
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

  const options: NumericControlOptions = props.uischema.options ?? {}
  const tooltip = options.tooltip

  return (
    <Form.Item
      label={props.label}
      id={props.id}
      name={props.path}
      required={props.required}
      initialValue={initialValue}
      rules={rules}
      validateTrigger={["onBlur"]}
      {...(tooltip
        ? {
            tooltip: {
              title: tooltip,
              icon: <QuestionCircleOutlined />,
            },
          }
        : {})}
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
