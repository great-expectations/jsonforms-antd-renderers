import type { ChangeEvent } from "react"
import { useCallback, useEffect } from "react"
import type { InputProps } from "antd"
import { Input, Form } from "antd"
import { QuestionCircleOutlined } from "@ant-design/icons"
import type { Rule } from "antd/es/form"
import type { TextAreaProps } from "antd/es/input"
import type { ControlProps } from "@jsonforms/core"

import type { TextControlOptions, TextControlType } from "../ui-schema"
import { assertNever } from "../common/assert-never"
import { withJsonFormsControlProps } from "@jsonforms/react"
interface TextControlProps extends ControlProps {
  data: string
  handleChange(path: string, value: string): void
  path: string
}

export function TextControl({
  label,
  visible,
  required,
  data,
  handleChange,
  path,
  schema,
  enabled,
  id,
  uischema,
}: TextControlProps) {
  const setInitialValue = useCallback(
    (value: unknown) => {
      if (typeof value !== "number") return value
      const coercedValue = coerceToString(value)
      handleChange(path, coercedValue)
      return coercedValue
    },
    [handleChange, path],
  )
  const ariaLabel = label || schema.description
  const options: TextControlOptions =
    (uischema.options as TextControlOptions) ?? {}
  const textControlType: TextControlType = options.type ?? "singleline"
  const tooltip = options.tooltip
  const placeholderText = options.placeholderText
  const autocomplete = options.autocomplete ?? "off"
  const form = Form.useFormInstance()
  const rules: Rule[] = [
    {
      required: required || options.required,
      whitespace: required,
      message: required ? `${label} is required` : "",
    },
    ...(options?.rules ? options.rules : []),
  ]
  useEffect(() => {
    form.setFieldValue(path, setInitialValue(data ?? schema.default))
  }, [data, form, path, schema.default, setInitialValue])

  return !visible ? null : (
    <Form.Item
      label={label}
      id={id}
      name={path}
      rules={rules}
      validateTrigger={["onBlur"]}
      {...(tooltip
        ? {
            tooltip: {
              title: tooltip,
              icon: <QuestionCircleOutlined />,
            },
          }
        : {})}
    >
      <TextControlInput
        type={textControlType}
        aria-label={ariaLabel}
        disabled={!enabled}
        autoComplete={autocomplete}
        onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
          handleChange(path, e.target.value)
        }
        placeholder={placeholderText ?? (label.toLowerCase() || "value")}
      />
    </Form.Item>
  )
}

type TextControlInputProps =
  | (InputProps & { type: "singleline" })
  | (TextAreaProps & { type: "multiline" })
  | (InputProps & { type: "password" })

function TextControlInput({ type, ...rest }: TextControlInputProps) {
  switch (type) {
    case "multiline":
      // idk why type isn't getting narrowed properly here, but cast seems safe
      return <Input.TextArea {...(rest as TextAreaProps)} />
    case "singleline":
      // idk why type isn't getting narrowed properly here, but cast seems safe
      return <Input {...(rest as InputProps)} />
    case "password":
      return <Input.Password {...(rest as InputProps)} />
    default:
      try {
        assertNever(type)
      } catch (e) {
        return <Input {...(rest as InputProps)} />
      }
  }
}

function coerceToString(value: number) {
  return value.toString()
}

export const TextRenderer = withJsonFormsControlProps(TextControl)
