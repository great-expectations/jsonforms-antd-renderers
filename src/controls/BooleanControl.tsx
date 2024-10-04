/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ControlProps, isDescriptionHidden } from "@jsonforms/core"
import { Form, FormItemProps } from "antd"
import { Checkbox } from "../antd/Checkbox"
import { withJsonFormsControlProps } from "@jsonforms/react"

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
  description,
}: ControlProps) {
  if (!visible) return null

  const isValid = errors.length === 0
  const appliedUiSchemaOptions = {
    ...(config as Record<string, unknown>),
    ...uischema.options,
  }

  const showDescription = !isDescriptionHidden(
    visible,
    description,
    // this comment is copypasta, may be removed:
    // Checkboxes do not receive focus until they are used, so
    // we cannot rely on focus as criteria for showing descriptions.
    // So we pass "false" to treat it as unfocused.
    false,
    !!appliedUiSchemaOptions.showUnfocusedDescription,
  )

  const showTooltip =
    !showDescription && !isDescriptionHidden(visible, description, true, true)
  const formItemProps =
    "formItemProps" in uischema ? (uischema.formItemProps as FormItemProps) : {}
  const tooltip = showTooltip && description ? description : undefined

  return (
    <Form.Item
      id={id}
      name={path}
      initialValue={data ?? schema.default}
      tooltip={tooltip}
      {...formItemProps}
    >
      <Checkbox
        id={`${id}-input`}
        isValid={isValid}
        data={data}
        enabled={enabled}
        label={label}
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
