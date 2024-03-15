import { LabelProps, RendererProps } from "@jsonforms/core"
import { Alert } from "antd"
import { AlertLayoutOptions } from "../ui-schema"
import { withJsonFormsLabelProps } from "@jsonforms/react"

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

export const AlertLayoutRenderer = withJsonFormsLabelProps(AlertLayout)
