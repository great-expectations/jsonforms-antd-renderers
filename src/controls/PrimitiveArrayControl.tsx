import { useMemo } from "react"
import {
  findUISchema,
  composePaths,
  ArrayControlProps,
  createDefaultValue,
} from "@jsonforms/core"
import { JsonFormsDispatch } from "@jsonforms/react"
import { Button } from "../antd/Button"
import { Row } from "antd"

export function PrimitiveArrayControl({
  renderers,
  uischemas,
  schema,
  data,
  label,
  path,
  visible,
  uischema,
  rootSchema,
  addItem,
  removeItems,
}: ArrayControlProps) {
  const childUiSchema = useMemo(
    () => findUISchema(uischemas ?? [], schema, uischema.scope, path, undefined, uischema, rootSchema),
    [uischemas, schema, path, uischema, rootSchema],
  )

  if (!visible) {
    return null
  }

  const ariaLabelWithFallback = label || "Value"

  return (
    <div>
      <Row>
        <Button
          size="small"
          onClick={addItem(path, createDefaultValue(schema, rootSchema))}
          aria-label={`Add ${ariaLabelWithFallback}`}
          icon="plus"
        >
          Add
        </Button>
      </Row>
        {data?.map((_: unknown, index: number) => {
          const childPath = composePaths(path, `${index}`)
          return (
            <Row key={childPath}>
              <JsonFormsDispatch
                schema={{ ...schema, description: `${ariaLabelWithFallback} ${index + 1}` }}
                uischema={childUiSchema || uischema}
                path={childPath}
                renderers={renderers}
              />
              <Button
                size="small"
                aria-label="Remove list item"
                onClick={() => {
                  removeItems?.(path, [index])?.()
                }}
                title="Delete element"
                icon="trash"
              />
            </Row>
          )
        })}
    </div>
  )
}
