import { JsonFormsRendererRegistryEntry, isStringControl, rankWith } from "@jsonforms/core"
import { withJsonFormsControlProps } from "@jsonforms/react"
import { TextControl } from "./TextControl"

export const TextControlRegistryEntry: JsonFormsRendererRegistryEntry = {
    tester: (uischema, schema, context) => {
      const rank = rankWith(2, isStringControl)(uischema, schema, context)
  
      return rank
    },
    renderer: withJsonFormsControlProps(TextControl),
  }