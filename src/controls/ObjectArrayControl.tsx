import {
  Helpers,
  ArrayLayoutProps as JSFArrayLayoutProps,
  composePaths,
  createDefaultValue,
  findUISchema,
} from "@jsonforms/core"
import {
  JsonFormsDispatch,
  withJsonFormsArrayLayoutProps,
} from "@jsonforms/react"
import { Flex, Form, List, Button, Space } from "antd"
import range from "lodash.range"
import { useEffect, useMemo } from "react"
import { ArrayControlOptions, ControlUISchema } from "../ui-schema"
import { usePreviousValue } from "../common/usePreviousValue"
import React from "react"

type ArrayLayoutProps = Omit<JSFArrayLayoutProps, "uischema"> & {
  uischema: ControlUISchema<unknown> | JSFArrayLayoutProps["uischema"]
}

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
  moveDown,
  moveUp,
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

  const formItemProps =
    "formItemProps" in uischema ? uischema.formItemProps : {}

  const labelDescription = Helpers.createLabelDescriptionFrom(uischema, schema)
  const label = labelDescription.show ? labelDescription.text : ""

  const options: ArrayControlOptions =
    (uischema.options as ArrayControlOptions) ?? {}

  const handleUpClick = (path: string, index: number) => () => {
    return moveUp?.(path, index)()
  }

  const handleDownClick = (path: string, index: number) => () => {
    return moveDown?.(path, index)()
  }

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

  if (!visible) {
    return null
  }
  return (
    <Form.Item
      required={required}
      rules={[{ required: required, message: `${label} is required` }]}
      validateTrigger={["onBlur"]}
      {...formItemProps}
    >
      <>{label}</>
      <List<unknown>
        dataSource={dataSource}
        renderItem={(_item: unknown, index: number) => {
          return (
            <List.Item
              key={index}
              actions={[
                dataSource.length > 1 && options.showSortButtons ? (
                  <Space key="sort">
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
                      disabled={index === dataSource.length - 1}
                      {...options.moveDownButtonProps}
                      onClick={handleDownClick(path, index)}
                    >
                      {!options.moveDownButtonProps?.icon && "Down"}
                    </Button>
                  </Space>
                ) : undefined,
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
              ].filter(Boolean)}
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
