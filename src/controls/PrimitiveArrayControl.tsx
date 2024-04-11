import {
  Helpers,
  ArrayLayoutProps,
  composePaths,
  createDefaultValue,
  findUISchema,
} from "@jsonforms/core"
import {
  JsonFormsDispatch,
  withJsonFormsArrayControlProps,
} from "@jsonforms/react"
import { Form, Button, Col, Row } from "antd"
import type { Rule } from "antd/es/form"
import { useMemo } from "react"
import { ArrayControlOptions } from "../ui-schema"
import { usePreviousValue } from "../common/usePreviousValue"
import React from "react"

export function PrimitiveArrayControl({
  data,
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
  ...props
}: ArrayLayoutProps) {
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

  const addDefaultItemToList = useMemo(
    () => addItem(path, createDefaultValue(schema, rootSchema)),
    [addItem, path, schema, rootSchema],
  )

  const prevDataValue = usePreviousValue(data)
  if (data === undefined && prevDataValue === null) {
    addDefaultItemToList()
  }

  if (!visible) {
    return null
  }

  const labelDescription = Helpers.createLabelDescriptionFrom(uischema, schema)
  const label = labelDescription.text || props.label // nullish coalescing doesn't work here because labelDescription.text can be an empty string =(

  const options: ArrayControlOptions =
    (uischema.options as ArrayControlOptions) ?? {}

  const rules: Rule[] = [
    { required: required, message: `${label} is required` },
  ]

  const style = { marginBottom: "0px" }

  return (
    <Form.Item label={label} required={required}>
      <Form.List name="names">
        {(fields, { add, remove }, { errors }) => {
          fields.length > 0 ? fields.forEach(() => add()) : add()
          return (
            <>
              <Row justify={"start"}>
                <Col>
                  {fields.map((field, index) => (
                    <Form.Item key={index} rules={rules} style={style}>
                      <Row gutter={12}>
                        <Col>
                          <JsonFormsDispatch
                            enabled={enabled} // not crazy about this pattern of overriding the description, but it solves the problem of disappearing aria labels
                            schema={{
                              ...schema,
                              description: `${label} ${index + 1}`,
                            }}
                            path={composePaths(path, `${index}`)}
                            uischema={foundUISchema}
                            renderers={renderers}
                            cells={cells}
                            uischemas={uischemas}
                          />
                        </Col>
                        <Col>
                          {fields.length > 1 ? (
                            <Button
                              key="remove"
                              disabled={
                                !removeItems ||
                                (required && fields.length === 1 && index === 0)
                              }
                              {...options.removeButtonProps}
                              onClick={(e) => {
                                e.stopPropagation()
                                remove(field.name)
                                removeItems?.(path, [index])()
                              }}
                            >
                              {options.removeButtonProps?.children ?? "Delete"}
                            </Button>
                          ) : null}
                        </Col>
                      </Row>
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Row>
                      <Button
                        {...options.addButtonProps}
                        onClick={(e) => {
                          e.stopPropagation()
                          add()
                          addDefaultItemToList()
                        }}
                      >
                        {options.addButtonProps?.children ?? `Add ${label}`}
                      </Button>
                    </Row>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )
        }}
      </Form.List>
    </Form.Item>
  )
}

export const PrimitiveArrayRenderer = withJsonFormsArrayControlProps(
  React.memo(PrimitiveArrayControl),
)
