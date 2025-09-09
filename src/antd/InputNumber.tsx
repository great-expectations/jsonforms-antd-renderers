import { useRef } from "react"
import { ControlProps, RendererProps } from "@jsonforms/core"
import { InputNumber as AntdInputNumber } from "antd"
import { NumericControlOptions } from "../ui-schema"
import {
  areStringNumbersEqual,
  coerceToInteger,
  coerceToNumber,
  decimalToPercentage,
  percentageStringToDecimal,
} from "../controls/utils"

type AntdInputNumberProps = React.ComponentProps<typeof AntdInputNumber>
type InputNumberProps = AntdInputNumberProps & RendererProps & ControlProps

/**
 * Creates a change handler for InputNumber that properly coerces values based on schema type
 */
function createInputNumberChangeHandler(
  handleChange: (path: string, value: number | string | null) => void,
  path: string,
  isInteger: boolean,
) {
  return (value: number | string | null) => {
    if (typeof value !== "number") return handleChange(path, value)
    if (isInteger) return handleChange(path, coerceToInteger(value))
    return handleChange(path, coerceToNumber(value))
  }
}

export function InputNumber({
  handleChange,
  path,
  schema,
  ...props
}: InputNumberProps) {
  const incomingValue = useRef<string>()
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

  const onChange = (value: number | string | null) => {
    // This ensures that each invocation of createInputNumberChangeHandler spawns a
    // unique closure for each `value` that's passed in. Helps avoid a dependency
    // on useCallback, which can cause a double-render.
    createInputNumberChangeHandler(handleChange, path, isInteger)(value)
  }

  const options = props.uischema.options as NumericControlOptions
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
    /**
     * See block comment in `parser()` below.
     */
    if (
      value &&
      typeof incomingValue.current === "string" &&
      areStringNumbersEqual(incomingValue.current, value)
    ) {
      return incomingValue.current
    }

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
    /**
     * When a parser & formatter are both present it triggers a
     * double-render of the wrapped AntD InputNumber. This double-render
     * also triggers a double-set of the incoming value, which will format
     * and remove leading zeros. We'd like to preserve those leading zeros
     * if they're part of a valid number, because a user may simply want
     * to update a value like 30000 to 300 without having to retype the full
     * number.
     *
     * The incomingValue.current ref updates on every input value which allows
     * the subsequent formatter call to access the raw value and make decisions
     * based on whether or not it has a leading zero, while avoiding
     * any async issues caused by needing to set or wait for state changes.
     */
    incomingValue.current = value
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
      placeholder={options?.placeholder}
      aria-label={ariaLabel}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
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
