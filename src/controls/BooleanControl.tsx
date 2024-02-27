/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ControlProps,
  isDescriptionHidden,
} from "@jsonforms/core"
import { Form } from "antd"
import { Checkbox } from "../antd/Checkbox"
import { QuestionCircleOutlined } from "@ant-design/icons"

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isValid = errors.length === 0
  const appliedUiSchemaOptions = {...config, ...uischema.options}

  const showDescription = !isDescriptionHidden(
    visible,
    description,
    // this comment is copypasta, may be removed:
    // Checkboxes do not receive focus until they are used, so
    // we cannot rely on focus as criteria for showing descriptions.
    // So we pass "false" to treat it as unfocused.
    false,
    appliedUiSchemaOptions.showUnfocusedDescription,
  )

  const showTooltip =
    !showDescription &&
    !isDescriptionHidden(
      visible,
      description,
      // this comment is copypasta, may be removed:
      // Tooltips have their own focus handlers, so we do not need to rely
      // on focus state here. So we pass 'true' to treat it as focused.
      true,
      // this comment is copypasta, may be removed:
      // We also pass true here for showUnfocusedDescription since it should
      // render regardless of that setting.
      true,
    )
  return (
    <Form.Item
      id={id}
      name={path}
      initialValue={data ?? schema.default}
      {...{
        ...(showTooltip
          ? {
              tooltip: {
                title: description,
                icon: <QuestionCircleOutlined />,
              },
            }
          : {}),
      }}
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
