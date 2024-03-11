import { CellProps, ControlProps } from "@jsonforms/core"
import { withJsonFormsControlProps } from "@jsonforms/react"

export function UnknownControl(props: ControlProps | CellProps) {
  // console.log({ schema: props.schema, path: props.path, schemaPath: props.schemaPath, props })
  return (
    <div style={{ color: "red" }}>
      No applicable renderer found for {props.schema?.type} type field &quot;
      {props.path}&quot;.
    </div>
  )
}

export const UnknownRenderer = withJsonFormsControlProps(UnknownControl)
