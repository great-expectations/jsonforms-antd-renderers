import {
  Helpers,
  composePaths,
  createDefaultValue,
  findUISchema,
  ArrayControlProps as JSFArrayControlProps,
} from "@jsonforms/core"
import {
  JsonFormsDispatch,
  withJsonFormsArrayControlProps,
} from "@jsonforms/react"
import { Form, Button, Col, Row, Space } from "antd"
import React, { useEffect, useMemo } from "react"
import { ArrayControlOptions, ControlUISchema } from "../ui-schema"
import { usePreviousValue } from "../common/usePreviousValue"
import { ArrayIndexContext } from "./combinators/ArrayIndexContext"

type ArrayControlProps = Omit<JSFArrayControlProps, "data" | "uischema"> & {
  data?: unknown[]
  uischema: ControlUISchema<unknown> | JSFArrayControlProps["uischema"]
}

export function PrimitiveArrayControl({
  id,
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
  moveDown,
  moveUp,
  ...props
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

  const addDefaultItemToList = useMemo(
    () => addItem(path, createDefaultValue(schema, rootSchema)),
    [addItem, path, schema, rootSchema],
  )

  const prevDataValue = usePreviousValue(data)
  useEffect(() => {
    if (data === undefined && prevDataValue === null) {
      addDefaultItemToList()
    }
  })

  if (!visible) {
    return null
  }

  const labelDescription = Helpers.createLabelDescriptionFrom(uischema, schema)
  const label = labelDescription.text || props.label // nullish coalescing doesn't work here because labelDescription.text can be an empty string =(

  const options: ArrayControlOptions = uischema.options ?? {}
  const formItemProps =
    "formItemProps" in uischema ? uischema.formItemProps : {}

  const handleUpClick = (path: string, index: number) => () => {
    return moveUp?.(path, index)()
  }

  const handleDownClick = (path: string, index: number) => () => {
    return moveDown?.(path, index)()
  }

  console.log(
    "xxxx jsonforms PrimitiveArrayControl list/path:",
    path,
    formItemProps,
  )
  return (
    <Form.Item id={id} label={label} required={required} {...formItemProps}>
      <Form.List name={path} initialValue={data ?? [undefined]}>
        {(fields, { add, remove }, { errors }) => (
          <Row justify={"start"}>
            <Col>
              {fields.map((field, index) => (
                <Row key={field.key} gutter={12}>
                  {fields.length > 1 && options.showSortButtons ? (
                    <Col>
                      <Space>
                        <Button
                          aria-label={`Move up`}
                          disabled={index === 0}
                          {...options.moveUpButtonProps}
                          onClick={handleUpClick(path, index)}
                        >
                          {!options.moveUpButtonProps?.icon && "Up"}
                        </Button>
                        <Button
                          aria-label={`Move down`}
                          disabled={index === fields.length - 1}
                          {...options.moveDownButtonProps}
                          onClick={handleDownClick(path, index)}
                        >
                          {!options.moveDownButtonProps?.icon && "Down"}
                        </Button>
                      </Space>
                    </Col>
                  ) : null}
                  <Col>
                    <ArrayIndexContext.Provider value={{ path: path, index }}>
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
                    </ArrayIndexContext.Provider>
                  </Col>
                  {fields.length > 1 ? (
                    <Col>
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
                    </Col>
                  ) : null}
                </Row>
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
        )}
      </Form.List>
    </Form.Item>
  )
}

export const PrimitiveArrayRenderer = withJsonFormsArrayControlProps(
  React.memo(PrimitiveArrayControl),
)
