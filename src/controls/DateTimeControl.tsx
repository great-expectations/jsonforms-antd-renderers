import { memo, useEffect } from "react"
import type { ControlProps as JSFControlProps } from "@jsonforms/core"
import { withJsonFormsControlProps } from "@jsonforms/react"
import { DatePicker, Form } from "antd"
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

function getOverrides(options: unknown): DateTimeControlOptions {
  if (isDateTimeControlOptions(options)) {
    return options
  }
  return {}
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
  const setInitialValue = createDateTimeInitialValueSetter(handleChange, path)
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

  const overrides = getOverrides(uischema.options)

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
        format={"YYYY-MM-DDTHH:mm:ssZ"}
        onChange={(_, dateString) => handleChange(path, dateString)}
        {...overrides}
      />
    </Form.Item>
  )
}

/**
 * Creates an initial value setter for DateTimeControl that coerces string values to dayjs objects
 */
function createDateTimeInitialValueSetter(
  handleChange: (path: string, value: string | undefined) => void,
  path: string,
) {
  return (value: string | undefined) => {
    const coercedValue = value ? dayjs(value) : value
    handleChange(path, value)
    return coercedValue
  }
}

export const DateTimeRenderer = withJsonFormsControlProps(memo(DateTimeControl))
