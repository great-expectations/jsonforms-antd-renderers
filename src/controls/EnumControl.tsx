import type { ControlProps as JSFControlProps } from "@jsonforms/core"
import { Col, Form, Select, Segmented, Radio } from "antd"
import type { Rule } from "antd/es/form"
import { EnumControlOptions, ControlUISchema } from "../ui-schema"
import { withJsonFormsControlProps } from "@jsonforms/react"

type ControlProps = Omit<JSFControlProps, "uischema"> & {
  uischema: ControlUISchema<unknown> | JSFControlProps["uischema"]
}

export const EnumControl = (props: ControlProps) => {
  if (!props.visible) return null

  const rules: Rule[] = [
    { required: props.required, message: `${props.label} is required` },
  ]

  const formItemProps =
    "formItemProps" in props.uischema ? props.uischema.formItemProps : {}

  const defaultValue =
    (props.data as unknown) ?? (props.schema.default as unknown)
  const options = props.schema.enum
    ? props.schema.enum?.map((item) => ({
        label: item as string,
        value: item as string,
      }))
    : []

  const appliedUiSchemaOptions = props.uischema.options as EnumControlOptions

  let selector
  switch (appliedUiSchemaOptions.optionType) {
    case "radio":
      selector = (
        <Radio.Group
          defaultValue={defaultValue}
          options={options}
          onChange={(e) => {
            props.handleChange(props.path, e.target.value)
          }}
          optionType="button"
          buttonStyle="solid"
        />
      )
      break
    case "segmented":
      selector = (
        <Segmented
          defaultValue={defaultValue}
          options={options}
          onChange={(value) => {
            props.handleChange(props.path, value)
          }}
        />
      )
      break
    case "dropdown":
    default:
      selector = (
        <Select
          showSearch
          defaultValue={defaultValue}
          options={options}
          onChange={(option) => {
            props.handleChange(props.path, option)
          }}
          filterOption={(inputValue, option) => {
            const optionValue = option?.value?.toString() || ""
            return (
              optionValue.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            )
          }}
        />
      )
      break
  }

  return (
    <Form.Item
      label={props.label}
      id={props.id}
      name={props.path}
      required={props.required}
      initialValue={defaultValue}
      rules={rules}
      validateTrigger={["onBlur"]}
      {...formItemProps}
    >
      <Col span={18}>{selector}</Col>
    </Form.Item>
  )
}

export const EnumRenderer = withJsonFormsControlProps(EnumControl)
