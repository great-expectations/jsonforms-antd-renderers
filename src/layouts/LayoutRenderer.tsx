import React from "react";
import { JsonSchema, OwnPropsOfRenderer } from "@jsonforms/core";
import { renderLayoutElements } from "./render-layout-elements";
import { UISchema } from "../ui-schema";

export interface AntDLayoutRendererProps extends OwnPropsOfRenderer {
  elements: UISchema[];
  direction?: "row" | "column";
}

function AntDLayoutComponent({
  elements,
  schema,
  path,
  enabled,
  renderers,
  cells,
  direction = "column",
}: AntDLayoutRendererProps) {
  if (!elements?.length && !Object.keys(elements).length) {
    return null;
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
        direction
      )}
    </>
  );
}
export const AntDLayoutRenderer = React.memo(AntDLayoutComponent);
