import { ReactElement } from "react"
import { ControlProps, RendererProps } from "@jsonforms/core"
import {
  Slider as AntdSlider,
  SliderSingleProps as AntdSliderSingleProps,
} from "antd"
import {
  coerceToInteger,
  coerceToNumber,
  decimalToPercentage,
} from "../controls/utils"

type SliderProps = AntdSliderSingleProps & RendererProps & ControlProps

export const Slider = (props: SliderProps): ReactElement<typeof AntdSlider> => {
  const isDataNonNullObject =
    typeof props.data === "object" &&
    props.data !== undefined &&
    props.data !== null
  const isDataEmptyObj = isDataNonNullObject
    ? Object.keys(props.data as object).length === 0
    : false
  const defaultValue =
    typeof props.schema?.default === "number"
      ? props.schema.default
      : props.schema.minimum
  const value =
    props.data === undefined || isDataEmptyObj
      ? defaultValue
      : (props.data as number)

  const addonAfter = props.uischema.options?.addonAfter as string | undefined
  const addonBefore = props.uischema.options?.addonBefore as string | undefined
  const isPercentage = addonAfter?.trim() === "%"

  const min = props.schema.minimum
  const max = props.schema.maximum
  const step = props.schema.multipleOf

  const numberType = props.schema.type
  const isInteger =
    (typeof numberType === "string" && numberType === "integer") ||
    (Array.isArray(numberType) && numberType.includes("integer"))
  const handleChange = (value: number) => {
    if (
      min !== undefined &&
      value >= min &&
      max !== undefined &&
      value <= max
    ) {
      if (isInteger) {
        props.handleChange(
          props.path,
          value !== null ? coerceToInteger(value) : value,
        )
      } else {
        props.handleChange(
          props.path,
          value !== null ? coerceToNumber(value) : value,
        )
      }
    }
  }

  const tooltip = {
    formatter: (value?: number) => {
      const tooltipValue = value !== undefined ? value : defaultValue
      const formattedTooltipValue = isPercentage
        ? decimalToPercentage(tooltipValue)
        : tooltipValue
      return `${addonBefore ? addonBefore : ""}${formattedTooltipValue}${
        addonAfter ? addonAfter : ""
      }`
    },
  }

  return (
    <AntdSlider
      defaultValue={defaultValue}
      value={value}
      onChange={(value) => handleChange(value)}
      min={min}
      max={max}
      step={step}
      tooltip={tooltip}
    />
  )
}
