import { JsonSchema, Tester, isNumberControl, isIntegerControl, and, or, schemaMatches } from "@jsonforms/core"

export const isNumericControl: Tester = or(isNumberControl, isIntegerControl)

export const isNumericSliderControl: Tester = and(
  isNumericControl, 
  schemaMatches((schema: JsonSchema) => {
    return schema.minimum !== undefined && schema.maximum !== undefined
  }),
)
