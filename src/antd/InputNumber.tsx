import { ReactElement } from "react"
import { ControlProps, RendererProps } from "@jsonforms/core"
import { InputNumber as AntdInputNumber } from "antd"
import { InputNumberOptions } from "../ui-schema"
import {
  coerceToInteger,
  coerceToNumber,
  decimalToPercentage,
  percentageStringToDecimal,
} from "../controls/utils"

type InputNumber = ReactElement<typeof AntdInputNumber>
type AntdInputNumberProps = React.ComponentProps<typeof AntdInputNumber>
type InputNumberProps = AntdInputNumberProps & RendererProps & ControlProps

export const InputNumber = (props: InputNumberProps): InputNumber => {
  const schema = props.schema
  const ariaLabel = props.label || schema.description || "Value"

  const defaultValue = schema.default as number | undefined
  const isDataNonNullObject =
    typeof props.data === "object" &&
    props.data !== undefined &&
    props.data !== null
  const isDataEmptyObj = isDataNonNullObject
    ? Object.keys(props.data as object).length === 0
    : false
  const value =
    props.data === undefined || isDataEmptyObj
      ? defaultValue
      : (props.data as number)

  const numberType = schema.type
  const isInteger =
    (typeof numberType === "string" && numberType === "integer") ||
    (Array.isArray(numberType) &&
      numberType.length === 1 &&
      numberType.includes("integer"))
  const handleChange = (value: number | string | null) => {
    if (typeof value === "number") {
      if (isInteger) {
        props.handleChange(props.path, coerceToInteger(value))
      } else {
        props.handleChange(props.path, coerceToNumber(value))
      }
    } else {
      props.handleChange(props.path, value)
    }
  }

  const options = props.uischema.options as InputNumberOptions
  const addonAfter = options?.addonAfter
  const addonBefore = options?.addonBefore
  const isPercentage =
    addonAfter && typeof addonAfter === "string"
      ? addonAfter?.trim() === "%"
      : false

  const min = schema.minimum
  const max = schema.maximum
  const marginLeft = min === undefined || max === undefined ? 0 : 16
  const style = { marginLeft: marginLeft, width: "100%" }

  const formatter = (value?: string | number): string => {
    if (value !== "" && value !== undefined) {
      if (isPercentage) {
        const valueFloat = typeof value === "string" ? parseFloat(value) : value
        return decimalToPercentage(valueFloat)
      } else {
        return value.toString()
      }
    }
    return ""
  }
  const parser = (value?: string): number | undefined => {
    const isNumeric = value ? !isNaN(Number(value)) : false
    if (isNumeric && value !== undefined) {
      if (isPercentage) {
        return percentageStringToDecimal(value)
      } else if (numberType === "integer") {
        return Math.round(parseFloat(value))
      } else {
        return parseFloat(value)
      }
    }
    return undefined
  }

  return (
    <AntdInputNumber
      aria-label={ariaLabel}
      defaultValue={defaultValue}
      value={value}
      onChange={(value) => handleChange(value)}
      min={min}
      max={max}
      addonBefore={addonBefore}
      addonAfter={addonAfter}
      style={style}
      formatter={formatter}
      parser={parser as AntdInputNumberProps["parser"]}
      controls={false}
    />
  )
}
