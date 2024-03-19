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
import { Flex, List, Button } from "antd"
import range from "lodash.range"
import { useCallback, useMemo } from "react"
import { ArrayControlOptions } from "../ui-schema"

export function ObjectArrayControl({
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

  const innerCreateDefaultValue = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return createDefaultValue(schema, rootSchema)
  }, [schema, rootSchema])

  if (!visible) {
    return null
  }

  const labelDescription = Helpers.createLabelDescriptionFrom(uischema, schema)
  const label = labelDescription.show ? labelDescription.text : ""

  const options: ArrayControlOptions =
    (uischema.options as ArrayControlOptions) ?? {}

  const renderItem = (_item: number, index: number) => {
    return (
      <List.Item
        key={index}
        actions={[
          <Button
            key="remove"
            {...options.removeButtonProps}
            disabled={!removeItems || (required && data == 1 && index === 0)}
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
        {options.addButtonProps?.children ?? `Add ${label}`}
      </Button>
    </Flex>
  )

  return (
    <>
      <b>{label}</b>
      <List // there's a compelling case to be made for Form.List instead, but going with this for now
        dataSource={range(data)}
        renderItem={renderItem}
        {...(options.addButtonLocation === "top"
          ? { header: addButton }
          : { footer: addButton })}
      />
    </>
  )
}

export const ObjectArrayRenderer =
  withJsonFormsArrayLayoutProps(ObjectArrayControl)
