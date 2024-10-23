import { memo, useCallback, useEffect } from "react"
import type { ControlProps as JSFControlProps } from "@jsonforms/core"
import { withJsonFormsControlProps } from "@jsonforms/react"
import { DatePicker, type DatePickerProps, Form } from "antd"
import type { Rule } from "antd/es/form"
import dayjs from "dayjs"

import {
  ControlUISchema,
  DateTimeControlOptions,
  isDateTimeControlOptions,
} from "../ui-schema"

type ControlProps = Omit<JSFControlProps, "uischema"> & {
  uischema: ControlUISchema<unknown> | JSFControlProps["uischema"]
}
// initialize once
const DEFAULT_PROPS: DateTimeControlOptions = {
  format: { format: "YYYY-MM-DD HH:mm:ss", type: "mask" },
} as const

function getProps(options: unknown): DateTimeControlOptions {
  if (isDateTimeControlOptions(options)) {
    return options
  }
  return DEFAULT_PROPS
}

function getInitialValue(
  data: unknown,
  schemaDefault: unknown,
): string | undefined {
  if (typeof data === "string" && data !== "") {
    return data
  }
  if (typeof schemaDefault === "string" && schemaDefault !== "") {
    return schemaDefault
  }
  return undefined
}

export function DateTimeControl({
  handleChange,
  path,
  label,
  id,
  required,
  schema,
  uischema,
  visible,
  data,
}: ControlProps) {
  const setInitialValue = useCallback(
    (value: string | undefined) => {
      const coercedValue = value ? dayjs(value) : value
      handleChange(path, value)
      return coercedValue
    },
    [handleChange, path],
  )
  const form = Form.useFormInstance()
  useEffect(() => {
    form.setFieldValue(
      path,
      setInitialValue(getInitialValue(data, schema.default)),
    )
  }, [data, form, path, schema.default, setInitialValue])
  if (!visible) return null

  const rules: Rule[] = [{ required, message: `${label} is required` }]

  const formItemProps =
    "formItemProps" in uischema ? uischema.formItemProps : {}

  const onChange: DatePickerProps["onChange"] = (_dateObj, dateString) => {
    handleChange(path, dateString)
  }

  const options = getProps(uischema.options)

  return (
    <Form.Item
      label={label}
      id={id}
      name={path}
      required={required}
      validateTrigger={["onBlur"]}
      rules={rules}
      {...formItemProps}
    >
      <DatePicker
        format={DEFAULT_PROPS.format}
        onChange={onChange}
        {...options}
      />
    </Form.Item>
  )
}

export const DateTimeRenderer = withJsonFormsControlProps(memo(DateTimeControl))
