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
    return options
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
          format={"YYYY-MM-DDTHH:mm:ssZ"}
          onChange={(_, dateString) => handleChange(path, dateString)}
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
  if (typeof data === "string" && data !== "") {
    return toDate(data)
  }
  if (typeof schemaDefault === "string" && schemaDefault !== "") {
    return toDate(schemaDefault)
  }
  return undefined
}

function toDate(value: string | undefined): dayjs.Dayjs | undefined {
  return value !== undefined ? dayjs(value) : value
}

export const DateTimeRenderer = withJsonFormsControlProps(memo(DateTimeControl))
