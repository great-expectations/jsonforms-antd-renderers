import { LabelProps, RendererProps } from "@jsonforms/core"
import { Alert } from "antd"
import { AlertLayoutOptions } from "../ui-schema"

export function AlertLayout({ text, uischema }: LabelProps & RendererProps) {
  const options = uischema.options as AlertLayoutOptions
  return (
    <Alert
      style={{ marginBottom: "24px" }}
      type={options?.type}
      message={text}
      showIcon
    />
  )
}
