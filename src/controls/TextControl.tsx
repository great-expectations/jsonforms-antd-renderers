import type { ChangeEvent } from "react"
import { useCallback, useEffect } from "react"
import { Input, Form } from "antd"
import type { Rule } from "antd/es/form"
import type { ControlElement, ControlProps } from "@jsonforms/core"

import type { ControlUISchema, TextControlOptions } from "../ui-schema"
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
  const uiSchema = uischema as ControlUISchema<unknown> | ControlElement
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
    (uiSchema.options as TextControlOptions) ?? {}
  const formItemProps =
    "formItemProps" in uiSchema ? uiSchema.formItemProps : {}
  const tooltip = options.tooltip ? options.tooltip : formItemProps?.tooltip
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
      tooltip={tooltip}
      {...formItemProps}
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
