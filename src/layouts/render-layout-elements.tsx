import {
    JsonFormsCellRendererRegistryEntry,
    JsonFormsRendererRegistryEntry,
    JsonSchema,
    UISchemaElement,
  } from "@jsonforms/core"
  import { JsonFormsDispatch } from "@jsonforms/react"
  import { Col } from "antd"
  
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
      if (direction === "row") {
        return (
          <Col key={`${path}-${index}`} xs={24} sm={12}>
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
  