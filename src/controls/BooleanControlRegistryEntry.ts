import {
  isBooleanControl,
  rankWith,
  JsonFormsRendererRegistryEntry,
} from "@jsonforms/core"
import { withJsonFormsControlProps } from "@jsonforms/react"
import { BooleanControl } from "./BooleanControl"


export const BooleanControlRegistryEntry: JsonFormsRendererRegistryEntry = {
  renderer: withJsonFormsControlProps(BooleanControl),
  tester: rankWith(2, isBooleanControl),
}