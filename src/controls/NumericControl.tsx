import { ControlProps, RendererProps } from "@jsonforms/core"
import { Col, Form, InputNumber, Row, Slider } from "antd"
import { decimalToPercentage } from "./utils"



export const createNumericControl = (args: { coerceNumber: (value: number) => number; pattern?: string }) => {
  return function NumericControl({
    data,
    handleChange,
    path,
    required,
    label,
    visible,
    id,
    schema,
    uischema,
  }: ControlProps & RendererProps) {
    const arialLabelWithFallback = label || schema.description || "Value"
    const isRequired = required || uischema.options?.required as boolean

    const maxStepsWithoutTextInput = 100
    const { maximum, minimum, multipleOf } = schema
    const isRangeDefined = typeof maximum === "number" && typeof minimum === "number"
    let step: number | undefined = undefined
    let stepCount: number | undefined = undefined
    if (isRangeDefined) {
      const range = Math.abs(maximum - minimum)
      step = multipleOf || (range / maxStepsWithoutTextInput)
      stepCount = range / step
    }
    const isLargeStepCount = stepCount && stepCount > maxStepsWithoutTextInput

    const initialValue: number | undefined = typeof schema?.default === "number" ? schema.default : minimum
    const isEmptyObj = typeof data === "object" && data !== undefined && data !== null ? Object.keys(data as object).length === 0 : false
    const value = data === undefined || isEmptyObj ? initialValue : data as number | null
    
    const addonAfter = uischema.options?.addonAfter as string | undefined
    const addonBefore = uischema.options?.addonBefore as string | undefined
    const isPercentage = addonAfter?.trim() === "%"

    const onChange = (value: number | null) => {
      if ((typeof value === "number" && (!isRangeDefined || (isRangeDefined && value >= minimum && value <= maximum))) || value === null) {
        handleChange(path, value !== null ? args.coerceNumber(value) : value)
      }
    }

    const marginLeft = isRangeDefined ? 16 : 0
    const style = { marginLeft: marginLeft, width: "100%" }
    const formatter = ((value?: number) => {
      if (typeof value !== "undefined") {
        if (isPercentage) {
          return decimalToPercentage(value)
        } else {
          return value.toString()
        }
      }
      return ""
    })

    const numberInput = (
      <InputNumber
        aria-label={arialLabelWithFallback}
        value={value}
        defaultValue={initialValue}
        pattern={args.pattern}
        onChange={onChange}
        style={style}
        max={maximum}
        min={minimum}
        formatter={formatter}
        controls={false}
        addonAfter={addonAfter}
        addonBefore={addonBefore}
      />
    )

    if (!visible) return null

    const tooltip = {
      formatter: (value?: number) => {
        if (isPercentage) {
          return `${decimalToPercentage(value || initialValue)}%`
        } else {
          return `${addonBefore ? addonBefore : ""}${value || initialValue}${addonAfter ? addonAfter : ""}`
        }
      }
    }

    const slider = <Slider
      value={value === null ? initialValue : value}
      defaultValue={initialValue}
      min={minimum}
      max={maximum}
      disabled={initialValue === null}
      onChange={onChange}
      step={step}
      tooltip={tooltip}
    />

    return (
      <Form.Item
        label={label}
        id={id}
        name={path}
        required={isRequired}
        initialValue={initialValue}
        rules={[{ required, message: required ? `${label} is required` : "" }]}
        validateTrigger={["onBlur"]}
      >
        {isRangeDefined ? (
          <Row>
            <Col span={8}>{slider}</Col>
              {isLargeStepCount ? <Col span={7}>{numberInput}</Col> : null}
          </Row>
        ) : (
          <Col span={18}>{numberInput}</Col>
        )}
      </Form.Item>
    )
  }
}
