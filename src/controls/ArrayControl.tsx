/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Helpers,
  ArrayLayoutProps,
  ArrayControlProps,
  composePaths,
  createDefaultValue,
  findUISchema,
} from "@jsonforms/core"
import {
  JsonFormsDispatch,
  withJsonFormsArrayControlProps,
  withJsonFormsArrayLayoutProps,
} from "@jsonforms/react"
import { Flex, List, Button } from "antd"
import range from "lodash.range"
import { useCallback, useMemo } from "react"
import { ArrayControlOptions } from "../ui-schema"

export function ArrayControl({
  enabled,
  data,
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
}: ArrayLayoutProps | ArrayControlProps) {
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
    () => createDefaultValue(schema, rootSchema),
    [schema, rootSchema],
  )

  if (!visible) {
    return null
  }

  const labelDescription = Helpers.createLabelDescriptionFrom(uischema, schema)
  const label = labelDescription.show ? labelDescription.text : ""

  const options: ArrayControlOptions =
    (uischema.options as ArrayControlOptions) ?? {}

  // Note: For primative arrays, ArrayControlProps.data is an array
  // For object arrays, ArrayLayoutProps.data is a number
  const dataSource: any[] =
    typeof data === "number"
      ? range(data)
      : // antd List component doesn't like undefined/null in the dataSource
        data?.map((item: any) => item ?? "")
  const dataLength = typeof data === "number" ? data : data?.length || 0

  const renderItem = (_item: number, index: number) => {
    return (
      <List.Item
        key={index}
        actions={[
          <Button
            key="remove"
            {...options.removeButtonProps}
            disabled={
              !removeItems || (required && dataLength == 1 && index === 0)
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
  }

  const addButton = (
    <Flex justify="center">
      <Button
        {...options.addButtonProps}
        onClick={(e) => {
          e.stopPropagation()
          addItem(path, innerCreateDefaultValue())()
        }}
      >
        {options.addButtonProps?.children || `Add ${label}`}
      </Button>
    </Flex>
  )

  return (
    <>
      <b>{label}</b>
      <List // there's a compelling case to be made for Form.List instead, but going with this for now
        dataSource={dataSource}
        renderItem={renderItem}
        {...(options.addButtonLocation === "top"
          ? { header: addButton }
          : { footer: addButton })}
      />
    </>
  )
}

export const ObjectArrayRenderer = withJsonFormsArrayLayoutProps(ArrayControl)
export const PrimitiveArrayRenderer =
  withJsonFormsArrayControlProps(ArrayControl)
