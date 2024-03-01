import { LabelProps, RendererProps } from "@jsonforms/core"
import { Alert } from "antd"
import { AlertLabelOptions } from "../ui-schema"

export function AlertControl({ text, uischema }: LabelProps & RendererProps) {
  const options = uischema.options as AlertLabelOptions
  return <Alert style={{ marginBottom: "24px" }} type={options?.type} message={text} showIcon />
}