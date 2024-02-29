import { JsonFormsRendererRegistryEntry, isNumberControl, rankWith } from "@jsonforms/core"
import { withJsonFormsControlProps } from "@jsonforms/react"
import { NumberControl } from "./NumberControl"

export const NumberControlRegistryEntry: JsonFormsRendererRegistryEntry = {
  tester: rankWith(2, isNumberControl),
  renderer: withJsonFormsControlProps(NumberControl),
}