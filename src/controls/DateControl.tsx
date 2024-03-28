import { ControlProps } from "@jsonforms/core"
import { withJsonFormsControlProps } from "@jsonforms/react"
import { DatePicker, Form } from "antd"
import dateFnsGenerateConfig from "rc-picker/lib/generate/dateFns"
import { DateControlOptions } from ".."

interface DateControlProps extends ControlProps {
  data: string
  handleChange(path: string, value: Date | null): void
  path: string
}

const MyDatePicker = DatePicker.generatePicker<Date>(dateFnsGenerateConfig)

export function DateControl({
  data,
  handleChange,
  path,
  label,
  visible,
  id,
  required,
  uischema,
}: DateControlProps) {
  const options: DateControlOptions =
    (uischema.options as DateControlOptions) ?? {}
  const format = options.dateFormat ?? "MM/DD/YYYY"
  return !visible ? null : (
    <Form.Item label={label} id={id} name={path} required={required}>
      <MyDatePicker
        defaultValue={data ? new Date(data) : null}
        format={format}
        onChange={(e) => handleChange(path, e)}
      />
    </Form.Item>
  )
}

export const DateRenderer = withJsonFormsControlProps(DateControl)
