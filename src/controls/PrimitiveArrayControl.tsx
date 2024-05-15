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
import { Form, Button, Col, Row } from "antd"
import React, { useEffect, useMemo } from "react"
import { ArrayControlOptions } from "../ui-schema"
import { usePreviousValue } from "../common/usePreviousValue"
import { tooltipStringToAntdLabelTooltip } from "./utils"

type ArrayControlProps = Omit<JSFArrayControlProps, "data"> & {
  data?: unknown[]
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

  const options: ArrayControlOptions =
    (uischema.options) ?? {}
  const tooltip = options.tooltip ? tooltipStringToAntdLabelTooltip(options.tooltip) : undefined

  return (
    <Form.Item id={id} name={path} label={label} required={required} tooltip={tooltip}>
      <Form.List name={path} initialValue={data ?? [undefined]}>
        {(fields, { add, remove }, { errors }) => (
          <Row justify={"start"}>
            <Col>
              {fields.map((field, index) => (
                <Row key={field.key} gutter={12}>
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
