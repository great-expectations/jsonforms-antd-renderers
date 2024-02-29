import { ControlProps } from "@jsonforms/core"
import { Col, Form, InputNumber, Row, Slider } from "antd"
import { FormData } from "../json-schema"
import { decimalToPercentage, percentageStringToDecimal } from "./utils"


type NumberSchema = {
  type: "number"
  title: string
  default?: number
  minimum?: number
  maximum?: number
  description?: string
}

export type NumberSchemaData = FormData<NumberSchema>

interface NumericControlProps extends ControlProps {
  data: number | undefined | null
  handleChange(path: string, value: number | null): void
  path: string
  schema: NumberSchema
}

export const createNumericControl = (args: { coerceNumber: (value: number) => number; pattern?: string }) => {
  return function NumericControl({
    data,
    handleChange,
    path,
    label,
    visible,
    id,
    errors,
    schema,
    required,
  }: NumericControlProps) {
    const isValid = errors.length === 0
    let step = 0
    const { maximum, minimum } = schema
    const isRangeDefined = typeof maximum === "number" && typeof minimum === "number"
    const initialValue = data !== undefined ? data : schema?.default

    const onChange = (value: number | null) => {
      if (
        // nullable can come down on the schema, but is not defined in the types.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((schema).nullable && value === null) ||
        (typeof value === "number" && (!isRangeDefined || (isRangeDefined && value >= minimum && value <= maximum)))
      ) {
        handleChange(path, value ? args.coerceNumber(value) : value)
      }
    }
    if (isRangeDefined) {
      const range = Math.abs(maximum - minimum)
      step = args.coerceNumber(range < 10 ? 0.1 : 1)
    }

    const arialLabelWithFallback = label || schema.description || "Value"

    const percentageInput = (
      <InputNumber
        aria-label={arialLabelWithFallback}
        value={initialValue === null ? undefined : initialValue}
        pattern={args.pattern}
        onChange={onChange}
        status={!isValid ? "error" : undefined}
        style={{ marginLeft: 16, width: "100%" }}
        max={maximum}
        min={minimum}
        step={step}
        formatter={(value) => decimalToPercentage(value)}
        parser={percentageStringToDecimal}
        controls={false}
        addonAfter="%"
      />
    )

    const numberInput = (
      <InputNumber
        aria-label={arialLabelWithFallback}
        value={initialValue === null ? undefined : initialValue}
        pattern={args.pattern}
        onChange={onChange}
        status={!isValid ? "error" : undefined}
        style={{ marginLeft: 0, width: "100%" }}
      />
    )

    if (!visible) return null

    return (
      <Form.Item
        label={label}
        id={id}
        name={path}
        initialValue={initialValue === null ? undefined : initialValue}
        rules={[{ required, message: required ? `${label} is required` : "" }]}
        validateTrigger={["onBlur"]}
      >
        {isRangeDefined ? (
          <Row>
            <Col span={8}>
              <Slider
                value={initialValue === null ? undefined : initialValue}
                min={minimum}
                max={maximum}
                disabled={initialValue === null}
                onChange={onChange}
                step={step}
                tooltip={{
                  formatter: (value) => `${decimalToPercentage(value)}%`,
                }}
              />
            </Col>
            <Col span={7}>{percentageInput}</Col>
          </Row>
        ) : (
          <Col span={18}>{numberInput}</Col>
        )}
      </Form.Item>
    )
  }
}
