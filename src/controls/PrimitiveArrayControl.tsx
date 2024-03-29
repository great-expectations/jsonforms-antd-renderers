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
import { useEffect, useMemo } from "react"
import { ArrayControlOptions } from "../ui-schema"
import { usePreviousValue } from "../common/usePrevious"
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

  const addItemToList = useMemo(
    () => addItem(path, createDefaultValue(schema, rootSchema)),
    [addItem, path, schema, rootSchema],
  )

  const prevDataValue = usePreviousValue(data)
  useEffect(() => {
    if (data === undefined && prevDataValue === null) {
      addItemToList()
    }
  })

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

  const style = { marginBottom: "0px"}

  return (
    <Form.Item label={label} required={required}>
      <Form.List name="names">
        {(fields, { add, remove }, { errors }) => {
          fields.length === 0 && add()
          return (
            <>
              <Row justify={"start"}>
                <Col>
                  {fields.map((field, index) => (
                    <Form.Item key={index} rules={rules} style={style}>
                      <Row gutter={12}>
                        <Col>
                          <JsonFormsDispatch
                            enabled={enabled}
                            schema={schema}
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
                          addItemToList()
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
