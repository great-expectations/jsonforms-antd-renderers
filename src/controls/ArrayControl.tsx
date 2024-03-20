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
  withJsonFormsArrayLayoutProps,
} from "@jsonforms/react"
import { Flex, List, Button } from "antd"
import range from "lodash.range"
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

export function ObjectArrayControl(props: ArrayLayoutProps) {
  // For object arrays, ArrayLayoutProps.data is a number
  const dataSource = useMemo(() => range(props.data), [props.data])

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
  dataSource,
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

  const renderItem = (_item: unknown, index: number) => {
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
      <List<unknown> // there's a compelling case to be made for Form.List instead, but going with this for now
        dataSource={dataSource}
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

export const PrimitiveArrayRenderer = withJsonFormsArrayControlProps(
  PrimitiveArrayControl,
)
