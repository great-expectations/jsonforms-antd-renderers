import React from "react"
import { JsonSchema, OwnPropsOfRenderer } from "@jsonforms/core"
import { renderLayoutElements } from "./render-layout-elements"
import { UISchema } from "../ui-schema"

export interface AntDLayoutProps extends OwnPropsOfRenderer {
  elements: UISchema<unknown>[]
  direction?: "row" | "column"
}

function AntDLayoutComponent({
  elements,
  schema,
  path,
  enabled,
  renderers,
  cells,
  direction = "column",
}: AntDLayoutProps) {
  if (!elements?.length && !Object.keys(elements).length) {
    return null
  }
  return (
    <>
      {renderLayoutElements(
        elements,
        schema as JsonSchema,
        path as string,
        !!enabled,
        renderers,
        cells,
        direction,
      )}
    </>
  )
}
export const AntDLayout = React.memo(AntDLayoutComponent)
