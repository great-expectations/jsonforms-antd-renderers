import type { ChangeEvent } from "react"
import { useCallback, useEffect } from "react"
import { Input, Form } from "antd"
import { QuestionCircleOutlined } from "@ant-design/icons"
import type { Rule } from "antd/es/form"
import type { ControlProps } from "@jsonforms/core"

import type { TextControlOptions } from "../ui-schema"
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
  const tooltip = options.tooltip
  const placeholderText = options.placeholderText
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
        aria-label={ariaLabel}
        disabled={!enabled}
        autoComplete="off"
        onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
          handleChange(path, e.target.value)
        }
        placeholder={placeholderText ?? (label.toLowerCase() || "value")}
        textControlOptions={options}
      />
    </Form.Item>
  )
}

type TextControlInputProps = {
  "aria-label": string | undefined
  disabled: boolean
  autoComplete: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
  placeholder: string
  textControlOptions: TextControlOptions
}

function TextControlInput({
  textControlOptions,
  ...rest
}: TextControlInputProps) {
  if (
    !(`type` in textControlOptions) ||
    textControlOptions.type === undefined
  ) {
    return <Input {...{ ...rest, ...textControlOptions }} />
  }

  switch (textControlOptions.type) {
    case "multiline":
      return <Input.TextArea {...{ ...rest, ...textControlOptions }} />
    case "singleline":
      return <Input {...{ ...rest, ...textControlOptions }} />
    case "password":
      return <Input.Password {...{ ...rest, ...textControlOptions }} />

    default:
      try {
        assertNever(textControlOptions.type)
      } catch (e) {
        return <Input {...{ ...rest, ...textControlOptions }} />
      }
  }
}

function coerceToString(value: number) {
  return value.toString()
}

export const TextRenderer = withJsonFormsControlProps(TextControl)
