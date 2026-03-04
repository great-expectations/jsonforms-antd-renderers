/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ControlProps } from "@jsonforms/core"
import { Form, FormItemProps } from "antd"
import { Checkbox } from "../antd/Checkbox"
import { withJsonFormsControlProps } from "@jsonforms/react"
import { BooleanControlOptions } from "../ui-schema"

export function BooleanControl({
  data,
  visible,
  label,
  id,
  enabled,
  uischema,
  schema,
  rootSchema,
  handleChange,
  errors,
  path,
  config,
}: ControlProps) {
  if (!visible) return null

  const isValid = errors.length === 0
  const formItemProps =
    "formItemProps" in uischema ? (uischema.formItemProps as FormItemProps) : {}
  const options = uischema.options as BooleanControlOptions | undefined
  const labelOnTop = options?.labelPlacement === "top"

  return (
    <Form.Item
      id={id}
      name={path}
      label={labelOnTop ? label : undefined}
      initialValue={data ?? schema.default}
      {...formItemProps}
    >
      <Checkbox
        id={`${id}-input`}
        isValid={isValid}
        data={data}
        enabled={enabled}
        label={labelOnTop ? "" : label}
        visible={visible}
        path={path}
        uischema={uischema}
        schema={schema}
        rootSchema={rootSchema}
        handleChange={handleChange}
        errors={errors}
        config={config}
      />
    </Form.Item>
  )
}

export const BooleanRenderer = withJsonFormsControlProps(BooleanControl)
