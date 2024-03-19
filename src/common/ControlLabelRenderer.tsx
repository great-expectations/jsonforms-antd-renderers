import { JsonSchema } from "@jsonforms/core"
import { ControlUISchema, LabelDescription } from "../ui-schema"
import { Typography } from "antd"
import { assertNever } from "./assert-never"

export function ControlLabelRenderer({
  uischema,
  schema,
}: {
  uischema: ControlUISchema
  schema: JsonSchema
}) {
  const controlUISchema: ControlUISchema = uischema
  const text = getUiSchemaLabel(controlUISchema)
  
  if (!text && !schema.title) {
    return null
  }

  if (!text && schema.title) {
    return <Typography.Title>{schema.title}</Typography.Title>
  }

  if (typeof controlUISchema.label === "object" && controlUISchema.label.type) {
    const labelType = controlUISchema.label.type
    switch (labelType) {
      case "Text":
        return (
          <Typography.Text {...controlUISchema.label.textProps}>
            {text}
          </Typography.Text>
        )

      case "Title":
        return (
          <Typography.Title {...controlUISchema.label.titleProps}>
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

function getUiSchemaLabel(
  uischema: ControlUISchema,
): string | undefined {
  const label = uischema.label
  if (!label) {
    return undefined
  }
  if (
    (label as LabelDescription).text &&
    (label as LabelDescription).show !== false
  ) {
    return (label as LabelDescription).text
  }
  if (typeof label === "string") {
    return label
  }
}
