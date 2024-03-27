import {
  Helpers,
  ArrayLayoutProps,
  composePaths,
  createDefaultValue,
  findUISchema,
} from "@jsonforms/core"
import {
  JsonFormsDispatch,
  withJsonFormsArrayLayoutProps,
} from "@jsonforms/react"
import { Flex, Form, List, Button } from "antd"
import type { Rule } from "antd/es/form"
import range from "lodash.range"
import { useEffect, useMemo } from "react"
import { ArrayControlOptions } from "../ui-schema"
import { usePreviousValue } from "../common/usePreviousValue"
import React from "react"

export function ObjectArrayControl({
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
  const foundUISchema = useMemo(() => {
    return findUISchema(
      uischemas ?? [],
      schema,
      uischema.scope,
      path,
      undefined,
      uischema,
      rootSchema,
    )
  }, [uischemas, schema, path, uischema, rootSchema])

  const dataSource = useMemo(() => range(data), [data])

  const addItemToList = useMemo(
    () => addItem(path, createDefaultValue(schema, rootSchema)),
    [addItem, path, rootSchema, schema],
  )

  const prevDataValue = usePreviousValue(data)
  useEffect(() => {
    if (data === 0 && prevDataValue === null) {
      addItemToList()
    }
  })

  const labelDescription = Helpers.createLabelDescriptionFrom(uischema, schema)
  const label = labelDescription.show ? labelDescription.text : ""

  const options: ArrayControlOptions =
    (uischema.options as ArrayControlOptions) ?? {}

  const addButton = (
    <Flex justify="center">
      <Button
        {...options.addButtonProps}
        onClick={(e) => {
          e.stopPropagation()
          addItemToList()
        }}
      >
        {options.addButtonProps?.children ?? `Add ${label}`}
      </Button>
    </Flex>
  )

  const rules: Rule[] = [
    { required: required, message: `${label} is required` },
  ]
  if (!visible) {
    return null
  }
  return (
    <Form.Item
      required={required}
      rules={rules}
      validateTrigger={["onBlur"]}
    >
      <>{label}</>
      <List<unknown>
        dataSource={dataSource}
        renderItem={(_item: unknown, index: number) => {
          return (
            <List.Item
              key={index}
              actions={[
                <Button
                  key="remove"
                  {...options.removeButtonProps}
                  disabled={
                    !removeItems ||
                    (required && dataSource.length == 1 && index === 0)
                  }
                  onClick={(e) => {
                    e.stopPropagation()
                    removeItems?.(path, [index])()
                  }}
                >
                  {options.removeButtonProps?.children ?? "Delete"}
                </Button>,
              ]}
            >
              <div style={{ width: "100%" }}>
                <JsonFormsDispatch
                  enabled={enabled}
                  schema={schema}
                  path={composePaths(path, `${index}`)}
                  uischema={foundUISchema}
                  renderers={renderers}
                  cells={cells}
                  uischemas={uischemas}
                />
              </div>
            </List.Item>
          )
        }}
        {...(options.addButtonLocation === "top"
          ? { header: addButton }
          : { footer: addButton })}
      />
    </Form.Item>
  )
}

export const ObjectArrayRenderer = withJsonFormsArrayLayoutProps(
  React.memo(ObjectArrayControl),
)
