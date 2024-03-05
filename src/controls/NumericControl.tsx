import { ControlProps, RendererProps } from "@jsonforms/core"
import { Col, Form, InputNumber, Row, Slider } from "antd"
import { decimalToPercentage } from "./utils"



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
    uischema,
    required,
  }: ControlProps & RendererProps) {
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
    
    const addonAfter = uischema.options?.addonAfter as string | undefined
    const addonBefore = uischema.options?.addonBefore as string | undefined
    const isPercentage = addonAfter?.trim() === "%"

    const numberData = data as number | undefined | null
    const defaultValue: number | undefined = typeof schema?.default === "number" ? schema.default : undefined
    const initialValue = typeof numberData === "number" ? numberData : defaultValue

    const onChange = (value: number | null) => {
      if (
        (value === null) ||
        (typeof value === "number" && (!isRangeDefined || (isRangeDefined && value >= minimum && value <= maximum)))
      ) {
        handleChange(path, value ? args.coerceNumber(value) : value)
      }
    }

    const arialLabelWithFallback = label || schema.description || "Value"

    const isValid = Object.keys(numberData ? numberData : {}).length === 0 || errors.length === 0
    console.log({errors})
    const status = !isValid ? "error" : undefined

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
        value={initialValue}
        required={required}
        pattern={args.pattern}
        onChange={onChange}
        status={status}
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
        if (typeof value === "number") {
          if (isPercentage) {
            return `${decimalToPercentage(value)}%`
          } else {
            return `${addonBefore ? addonBefore : ""}${value}${addonAfter ? addonAfter : ""}`
          }
        } else {
          return defaultValue
        }
      }
    }

    const slider = <Slider
      value={initialValue}
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
        required={required}
        initialValue={initialValue}
        rules={[
          { required, message: required ? `${label} is required` : "" }
        ]}
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
