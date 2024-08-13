import { JsonSchema, Helpers, ControlElement } from "@jsonforms/core"
import { ControlUISchema, ControlUISchemaLabel } from "../ui-schema"
import { Typography } from "antd"
import { assertNever } from "./assert-never"

// This consumes a LabelDescription (+ other formats) in a Control UI Schema
export function ControlLabel({
  uischema,
  schema,
}: {
  uischema: ControlUISchema<unknown>
  schema: JsonSchema
}) {
  const labelDescription = Helpers.createLabelDescriptionFrom(
    uischema as unknown as ControlElement,
    schema,
  )
  const text = labelDescription.show ? labelDescription.text : null
  const labeledUISchema = uischema as ControlUISchemaLabel
  if (
    typeof labeledUISchema.label === "object" &&
    "type" in labeledUISchema.label
  ) {
    const labelType = labeledUISchema.label.type
    switch (labelType) {
      case "Text":
        return (
          <Typography.Text {...labeledUISchema.label.textProps}>
            {text}
          </Typography.Text>
        )

      case "Title":
        return (
          <Typography.Title {...labeledUISchema.label.titleProps}>
            {text}
          </Typography.Title>
        )
      default:
        try {
          assertNever(labelType)
        } catch (e) {
          console.error(
            `Invalid value configured in Control UI Schema for label.type: '${labelType as string}'`,
          )
        }
    }
  }
  return <Typography.Title>{text}</Typography.Title>
}
