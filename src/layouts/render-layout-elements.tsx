import {
  JsonFormsCellRendererRegistryEntry,
  JsonFormsRendererRegistryEntry,
  JsonSchema,
  UISchemaElement,
} from "@jsonforms/core"
import { JsonFormsDispatch } from "@jsonforms/react"
import { Col } from "antd"
import { ColumnLayoutProps } from "../ui-schema"

export const renderLayoutElements = (
  elements: UISchemaElement[],
  schema: JsonSchema,
  path: string,
  enabled: boolean,
  renderers?: JsonFormsRendererRegistryEntry[],
  cells?: JsonFormsCellRendererRegistryEntry[],
  direction?: "row" | "column",
) => {
  return elements.map((child, index) => {
    const cols = {
      xs: 24,
      sm: 12,
    }
    if ("layoutProps" in child) {
      cols.sm = (child.layoutProps as ColumnLayoutProps).columns ?? 12
    }

    if (direction === "row") {
      return (
        <Col key={`${path}-${index}`} xs={cols.xs} sm={cols.sm}>
          <JsonFormsDispatch
            key={`${path}-${index}`}
            uischema={child}
            schema={schema}
            path={path}
            enabled={enabled}
            renderers={renderers}
            cells={cells}
          />
        </Col>
      )
    }
    return (
      <JsonFormsDispatch
        key={`${path}-${index}`}
        uischema={child}
        schema={schema}
        path={path}
        enabled={enabled}
        renderers={renderers}
        cells={cells}
      />
    )
  })
}
