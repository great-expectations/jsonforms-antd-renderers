import { memo } from "react"
import type { ControlProps as JSFControlProps } from "@jsonforms/core"
import { withJsonFormsControlProps } from "@jsonforms/react"
import { Col, DatePicker, Form } from "antd"
import type { Rule } from "antd/es/form"
import dayjs from "dayjs"

import {
  ControlUISchema,
  DateTimeControlOptions,
  isDateTimeControlOptions,
} from "../ui-schema"
import { useNestedAntDFormContext } from "../hooks/useNestedAntDFormContext"

type ControlProps = Omit<JSFControlProps, "uischema"> & {
  uischema: ControlUISchema<unknown> | JSFControlProps["uischema"]
}

function getOverrides(options: unknown): DateTimeControlOptions {
  if (isDateTimeControlOptions(options)) {
    // Exclude 'format' to prevent it from being overridden by uischema options
    return Object.fromEntries(
      Object.entries(options).filter(([key]) => key !== "format")
    ) as DateTimeControlOptions
  }
  return {}
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
  const nestedAntdData = useNestedAntDFormContext()
  const name = nestedAntdData
    ? nestedAntdData.index !== undefined
      ? [nestedAntdData.path, nestedAntdData.index]
      : nestedAntdData.path
    : path

  if (!visible) return null

  const rules: Rule[] = [{ required, message: `${label} is required` }]

  const formItemProps =
    "formItemProps" in uischema ? uischema.formItemProps : {}

  const overrides = getOverrides(uischema.options)

  return (
    <Col>
      <Form.Item
        label={label}
        id={id}
        name={name}
        required={required}
        validateTrigger={["onBlur"]}
        rules={rules}
        initialValue={getInitialValue(data, schema.default)}
        {...formItemProps}
      >
        <DatePicker
          format="YYYY-MM-DD HH:mm:ss"
          showTime
          onChange={(date: dayjs.Dayjs | null) => handleChange(path, date ? date.format("YYYY-MM-DDTHH:mm:ss") : undefined)}
          {...overrides}
        />
      </Form.Item>
    </Col>
  )
}

function getInitialValue(
  data: unknown,
  schemaDefault: unknown,
): dayjs.Dayjs | undefined {
  const value = (typeof data === "string" && data !== "") ? data : 
                (typeof schemaDefault === "string" && schemaDefault !== "") ? schemaDefault : 
                undefined
  if (!value) return undefined
  const parsed = dayjs(value)
  return parsed.isValid() ? parsed : undefined
}

export const DateTimeRenderer = withJsonFormsControlProps(memo(DateTimeControl))
