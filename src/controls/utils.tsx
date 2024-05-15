import { QuestionCircleOutlined } from "@ant-design/icons"
import { LabelTooltipType } from "antd/es/form/FormItemLabel"

export function decimalToPercentage(value?: number) {
  if (value === undefined) return ""
  const percentage = parseFloat((value * 100).toFixed(10)) // accounting for 10 digits after the decimal point
  return `${percentage}`
}

export function percentageStringToDecimal(value: string | undefined) {
  return Number(value) / 100
}

export const coerceToInteger = (value: number) => Math.round(value)

export const coerceToNumber = (value: number) => Number(value)

export const tooltipStringToAntdLabelTooltip = (tooltip: string): LabelTooltipType => ({
    title: tooltip,
    icon: <QuestionCircleOutlined />,
})
