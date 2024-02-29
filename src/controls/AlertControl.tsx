import { Alert } from "antd"
import { AlertLabelOptions, LabelElement } from "../ui-schema"

type AlertControlProps = {
  text: string
  uischema: LabelElement
}

export function AlertControl({ text, uischema }: AlertControlProps) {
  const options: AlertLabelOptions | undefined = uischema.options
  return <Alert style={{ marginBottom: "24px" }} type={options?.type} message={text} showIcon />
}