import { JsonFormsRendererRegistryEntry, rankWith, uiTypeIs } from "@jsonforms/core"
import { withJsonFormsLabelProps } from "@jsonforms/react"
import { AlertControl } from "./AlertControl"

export const LabelRendererRegistryEntry: JsonFormsRendererRegistryEntry = {
    renderer: withJsonFormsLabelProps(AlertControl),
    tester: rankWith(100, uiTypeIs("Label")),
  }