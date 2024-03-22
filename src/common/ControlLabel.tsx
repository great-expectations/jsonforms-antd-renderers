import { JsonSchema, Helpers } from "@jsonforms/core"
import { ControlUISchema } from "../ui-schema"
import { Space, Typography } from "antd"
import { assertNever } from "./assert-never"

// This consumes a LabelDescription (+ other formats) in a Control UI Schema
export function ControlLabel({
  uischema,
  schema,
  labeledElements,
}: {
  uischema: ControlUISchema
  schema: JsonSchema
  labeledElements: React.ReactNode
}) {
  const controlUISchema: ControlUISchema = uischema
  const labelDescription = Helpers.createLabelDescriptionFrom(uischema, schema)
  const text = labelDescription.show ? labelDescription.text : null

  if (
    typeof controlUISchema.label === "object" &&
    "type" in controlUISchema.label
  ) {
    const labelType = controlUISchema.label.type
    switch (labelType) {
      case "Text":
        return (
          <Space direction="horizontal" style={{ width: "100%" }} size="middle">
            <Typography.Text {...controlUISchema.label.textProps}>
              {text}
            </Typography.Text>
            {labeledElements}
          </Space>
        )

      case "Title":
        return (
          <>
            <Typography.Title {...controlUISchema.label.titleProps}>
              {text}
            </Typography.Title>
            {labeledElements}
          </>
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
  return (
    <>
      <Typography.Title>{text}</Typography.Title>
      {labeledElements}
    </>
  )
}
