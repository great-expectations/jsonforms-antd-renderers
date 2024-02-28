import { LabelProps, RendererProps } from "@jsonforms/core"
import { Alert } from "antd"

export type AlertLabelOptions = {
    type?: "warning" | "success" | "info"
  }

export function AlertControl({ text, uischema }: LabelProps & RendererProps) {
  const options: AlertLabelOptions = uischema?.options as AlertLabelOptions
  return <Alert style={{ marginBottom: "24px" }} type={options?.type} message={text} showIcon />
}