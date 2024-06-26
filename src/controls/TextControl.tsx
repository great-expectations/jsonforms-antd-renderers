import type { ChangeEvent } from "react"
import { useCallback, useEffect } from "react"
import { Input, Form, InputProps } from "antd"
import type { Rule } from "antd/es/form"
import type {
  ControlElement,
  ControlProps as JSFControlProps,
} from "@jsonforms/core"

import type { ControlUISchema, TextControlOptions } from "../ui-schema"
import { assertNever } from "../common/assert-never"
import { withJsonFormsControlProps } from "@jsonforms/react"
import { TextAreaProps } from "antd/es/input/TextArea"

type ControlProps = Omit<JSFControlProps, "uischema"> & {
  data: string
  handleChange(path: string, value: string): void
  path: string
  uischema: ControlUISchema<unknown> | ControlElement
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
}: ControlProps) {
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
  const formItemProps =
    "formItemProps" in uischema ? uischema.formItemProps : {}
  const { tooltip: formItemTooltip, ...formItemPropsWOTooltip } =
    formItemProps ?? {}
  const tooltip = options.tooltip ? options.tooltip : formItemTooltip ?? ""

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
      validateTrigger={["onBlur"]}
      rules={rules}
      tooltip={tooltip}
      {...formItemPropsWOTooltip}
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
  const { inputProps, ...restTextControlOptions } = textControlOptions

  if (
    !(`type` in restTextControlOptions) ||
    restTextControlOptions.type === undefined
  ) {
    return (
      <Input
        {...{
          ...rest,
          ...(inputProps as InputProps),
          // hate this but because of destructuring we have to go back to casting
        }}
      />
    )
  }

  switch (restTextControlOptions.type) {
    case "multiline":
      return (
        <Input.TextArea
          {...{
            ...rest,
            ...(inputProps as TextAreaProps),
          }}
        />
      )
    case "singleline":
      return (
        <Input
          {...{
            ...rest,
            ...(inputProps as InputProps),
          }}
        />
      )
    case "password":
      return (
        <Input.Password
          {...{
            ...rest,
            ...(inputProps as InputProps),
          }}
        />
      )

    default:
      try {
        assertNever(restTextControlOptions.type)
      } catch (e) {
        return (
          <Input
            {...{
              ...rest,
              ...(inputProps as InputProps),
            }}
          />
        )
      }
  }
}

function coerceToString(value: number) {
  return value.toString()
}

export const TextRenderer = withJsonFormsControlProps(TextControl)
