import {
  Helpers,
  ArrayControlProps,
  composePaths,
  createDefaultValue,
  findUISchema,
} from "@jsonforms/core"
import {
  JsonFormsDispatch,
  withJsonFormsArrayControlProps,
} from "@jsonforms/react"
import { Form, Button } from "antd"
import type { Rule } from "antd/es/form"
import { useCallback, useMemo } from "react"
import { ArrayControlOptions } from "../ui-schema"

function PrimitiveArrayControl({
  enabled,
  path,
  schema,
  uischema,
  addItem,
  removeItems,
  renderers,
  cells,
  visible,
  rootSchema,
  uischemas,
  required,
}: ArrayControlProps) {
  const foundUISchema = useMemo(
    () =>
      findUISchema(
        uischemas ?? [],
        schema,
        uischema.scope,
        path,
        undefined,
        uischema,
        rootSchema,
      ),
    [uischemas, schema, path, uischema, rootSchema],
  )

  const innerCreateDefaultValue = useCallback(
    () => createDefaultValue(schema, rootSchema) as unknown,
    [schema, rootSchema],
  )

  if (!visible) {
    return null
  }

  const labelDescription = Helpers.createLabelDescriptionFrom(uischema, schema)
  const label = labelDescription.show ? labelDescription.text : ""

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };

  const options: ArrayControlOptions =
    (uischema.options as ArrayControlOptions) ?? {}

  const rules: Rule[] = [
    { required: required, message: `${label} is required` },
  ]

  return (
    <Form.List name="names">
      {(fields, { add, remove }, { errors }) => (
        <>
          {fields.map((field, index) => (
            <Form.Item
              {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
              label={index === 0 ? label : ""}
              required={false}
              key={index}
              rules={rules}
            >
              <JsonFormsDispatch
                enabled={enabled}
                schema={schema}
                path={composePaths(path, `${index}`)}
                uischema={foundUISchema}
                renderers={renderers}
                cells={cells}
                uischemas={uischemas}
              />
              {fields.length > 1 ? (
                <Button
                  {...options.removeButtonProps}
                  onClick={(e) => {
                    e.stopPropagation()
                    remove(field.name)
                    removeItems?.(path, [index])()
                  }}
                />
              ) : null}
            </Form.Item>
          ))}
          <Form.Item>
            <Button
              {...options.addButtonProps}
              onClick={(e) => {
                e.stopPropagation()
                add()
                addItem(path, innerCreateDefaultValue())()
              }}
            >
              {options.addButtonProps?.children ?? `Add ${label}`}
            </Button>
            <Form.ErrorList errors={errors} />
          </Form.Item>
        </>
      )}
    </Form.List>
  )
}

export const PrimitiveArrayRenderer = withJsonFormsArrayControlProps(
  PrimitiveArrayControl,
)
