import { ControlProps } from "@jsonforms/core"
import { withJsonFormsControlProps } from "@jsonforms/react"
import { DatePicker, Form } from "antd"
import dateFnsGenerateConfig from "rc-picker/lib/generate/dateFns"

interface DatetimeControlProps extends ControlProps {
  data: string
  handleChange(path: string, value: Date | null): void
  path: string
}

const MyDatePicker = DatePicker.generatePicker<Date>(dateFnsGenerateConfig)

export function DatetimeControl({
  data,
  handleChange,
  path,
  label,
  visible,
  id,
}: DatetimeControlProps) {
  const dateFormat = "MM/DD/YYYY"
  return !visible ? null : (
    <Form.Item label={label} id={id} name={path}>
      <MyDatePicker
        value={data ? new Date(data) : null}
        format={dateFormat}
        onChange={(e) => handleChange(path, e)}
      />
    </Form.Item>
  )
}

export const DatetimeRenderer = withJsonFormsControlProps(DatetimeControl)
