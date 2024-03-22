import {
  Helpers,
  ArrayLayoutProps,
  ArrayControlProps as JsonFormsArrayControlProps,
  composePaths,
  createDefaultValue,
  findUISchema,
} from "@jsonforms/core"
import {
  JsonFormsDispatch,
  withJsonFormsArrayControlProps,
} from "@jsonforms/react"
import { Form, Button } from "antd"
import { MinusCircleOutlined } from "@ant-design/icons"
import type { Rule } from "antd/es/form"
import { useCallback, useMemo } from "react"
import { ArrayControlOptions } from "../ui-schema"

interface ArrayControlProps
  extends Omit<JsonFormsArrayControlProps, "data">,
    Omit<ArrayLayoutProps, "data"> {
  dataSource: unknown[]
}

export function PrimitiveArrayControl(props: JsonFormsArrayControlProps) {
  // For primative arrays, ArrayControlProps.data is an array
  const dataSource: unknown[] = useMemo(
    () =>
      // antd List component doesn't like undefined/null in the dataSource
      ((props.data as unknown[])?.map(
        (item: unknown) => item ?? "",
      ) as unknown[]) ?? [],
    [props.data],
  )

  return <ArrayControl {...props} dataSource={dataSource} />
}

function ArrayControl({
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
              // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
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
                <MinusCircleOutlined
                  className="dynamic-delete-button"
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
