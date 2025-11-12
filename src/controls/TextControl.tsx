import type { ChangeEvent } from "react"
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
import { useNestedAntDFormContext } from "../hooks/useNestedAntDFormContext"

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
  const nestedAntdData = useNestedAntDFormContext()

  const ariaLabel = label || schema.description
  const options: TextControlOptions =
    (uischema.options as TextControlOptions) ?? {}
  const formItemProps =
    "formItemProps" in uischema ? uischema.formItemProps : {}
  const { tooltip: formItemTooltip, ...formItemPropsWOTooltip } =
    formItemProps ?? {}
  const tooltip = options.tooltip ? options.tooltip : (formItemTooltip ?? "")

  const placeholderText = options.placeholderText
  const rules: Rule[] = [
    {
      required: required || options.required,
      whitespace: required,
      message: required ? `${label} is required` : "",
    },
    ...(options?.rules ? options.rules : []),
  ]

  const name = nestedAntdData
    ? [nestedAntdData.path, nestedAntdData.index]
    : path

  return !visible ? null : (
    <Form.Item
      label={label}
      id={id}
      name={name}
      validateTrigger={["onBlur"]}
      rules={rules}
      initialValue={
        data === undefined
          ? (schema.default as string)
          : typeof data === "number"
            ? data.toString()
            : (data as string)
      }
      tooltip={tooltip}
      {...formItemPropsWOTooltip}
    >
      <TextControlInput
        aria-label={ariaLabel}
        value={typeof data === "number" ? data.toString() : (data as string)}
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
  value: string
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

export const TextRenderer = withJsonFormsControlProps(TextControl)
