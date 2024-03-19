/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Helpers,
  ArrayLayoutProps,
  ArrayControlProps,
  composePaths,
  createDefaultValue,
  findUISchema,
} from "@jsonforms/core"
import { JsonFormsDispatch } from "@jsonforms/react"
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
  const dataSource = typeof data === "number" ? range(data) : data
  const dataLength = typeof data === "number" ? data : data?.length || 0

  const renderItem = (_item: number, index: number) => {
    return (
      <List.Item
        key={index}
        actions={[
          <Button
            key="remove"
            children="Delete"
            {...options.removeButtonProps}
            disabled={
              !removeItems || (required && dataLength == 1 && index === 0)
            }
            onClick={(e) => {
              e.stopPropagation()
              removeItems?.(path, [index])()
            }}
          />,
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
        children={`Add ${label}`}
        {...options.addButtonProps}
        onClick={(e) => {
          e.stopPropagation()
          addItem(path, innerCreateDefaultValue())()
        }}
      />
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
