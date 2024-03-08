import { ReactElement } from "react"
import { ControlProps, RendererProps } from "@jsonforms/core"
import { InputNumber as AntdInputNumber } from "antd"
import { coerceToInteger, coerceToNumber, decimalToPercentage, percentageStringToDecimal } from "../controls/utils"

type InputNumber = ReactElement<typeof AntdInputNumber>
type AntdInputNumberProps = React.ComponentProps<typeof AntdInputNumber>
type InputNumberProps = AntdInputNumberProps & RendererProps & ControlProps

export const InputNumber = (props: InputNumberProps): InputNumber => {
  const schema = props.schema
  const ariaLabel = props.label || schema.description || "Value"

  const defaultValue = schema.default as number | undefined
  const dataIsNonNullObject = typeof props.data === "object" && props.data !== undefined && props.data !== null
  const dataIsEmptyObj = dataIsNonNullObject ? Object.keys(props.data as object).length === 0 : false
  const value = props.data === undefined || dataIsEmptyObj ? defaultValue : props.data as number

  const numberType = schema.type
  const isInteger = (typeof numberType === "string" && numberType === "integer") || (Array.isArray(numberType) && numberType.includes("integer"))
  const handleChange = (value: number | null) => {
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

  const addonAfter = props.uischema.options?.addonAfter as string | undefined
  const addonBefore = props.uischema.options?.addonBefore as string | undefined
  const isPercentage = addonAfter?.trim() === "%"

  const min = schema.minimum
  const max = schema.maximum
  const marginLeft = min === undefined || max === undefined ? 0 : 16
  const style = { marginLeft: marginLeft, width: "100%" }

  const formatter = ((value?: string | number): string => {
    if (value !== "" && value !== undefined) {
      if (isPercentage) {
        const valueFloat = typeof value === "string" ? parseFloat(value) : value
        return decimalToPercentage(valueFloat)
      } else {
        return value.toString()
      }
    }
    return ""
  })
  const parser = ((value?: string): number => {
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
    // this allows us to return undefined for cases where the value has been deleted
    // when InputNumber is paired with a Slider, the Slider value selector will disappear
    // for required fields an error message will show instead of jumping to some default value
    return undefined as unknown as number
  })

  return <AntdInputNumber
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
    parser={parser}
    controls={false}
  />
}
