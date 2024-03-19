import {
  JsonSchema,
  JsonFormsRendererRegistryEntry,
  JsonFormsCellRendererRegistryEntry,
  isBooleanControl,
  isStringControl,
  rankWith,
  uiTypeIs,
  isIntegerControl,
  isLayout,
  isObjectControl,
  isNumberControl,
  schemaMatches,
  not,
  and,
  or,
} from "@jsonforms/core"
import { withJsonFormsCellProps } from "@jsonforms/react"

import { BooleanRenderer } from "./controls/BooleanControl"
import { AlertLayoutRenderer } from "./layouts/AlertLayout"
import { TextRenderer } from "./controls/TextControl"
import { UnknownControl, UnknownRenderer } from "./controls/UnknownControl"
import { HorizontalLayoutRenderer } from "./layouts/HorizontalLayout"
import { VerticalLayoutRenderer } from "./layouts/VerticalLayout"
import { ObjectRenderer } from "./controls/ObjectControl"
import { GroupLayoutRenderer } from "./layouts/GroupLayout"
import { NumericRenderer } from "./controls/NumericControl"
import { NumericSliderRenderer } from "./controls/NumericSliderControl"

// Ordered from lowest rank to highest rank. Higher rank renderers will be preferred over lower rank renderers.
export const rendererRegistryEntries: JsonFormsRendererRegistryEntry[] = [
  {
    tester: rankWith(1, () => true),
    renderer: UnknownRenderer,
  },
  {
    tester: rankWith(1, uiTypeIs("Group")),
    renderer: GroupLayoutRenderer,
  },
  {
    tester: rankWith(2, uiTypeIs("HorizontalLayout")),
    renderer: HorizontalLayoutRenderer,
  },
  {
    tester: rankWith(2, uiTypeIs("VerticalLayout")),
    renderer: VerticalLayoutRenderer,
  },
  {
    tester: rankWith(2, isBooleanControl),
    renderer: BooleanRenderer,
  },
  {
    tester: rankWith(2, isStringControl),
    renderer: TextRenderer,
  },
  {
    tester: rankWith(2, uiTypeIs("Label")),
    renderer: AlertLayoutRenderer,
  },
  {
    tester: rankWith(2, or(isNumberControl, isIntegerControl)),
    renderer: NumericRenderer,
  },
  {
    tester: rankWith(
      3,
      and(
        or(isNumberControl, isIntegerControl),
        schemaMatches((schema: JsonSchema) => {
          return schema.minimum !== undefined && schema.maximum !== undefined
        }),
      ),
    ),
    renderer: NumericSliderRenderer,
  },
  {
    tester: rankWith(10, and(isObjectControl, not(isLayout))),
    renderer: ObjectRenderer,
  },
]

export const cellRegistryEntries: JsonFormsCellRendererRegistryEntry[] = [
  {
    tester: rankWith(1, () => true),
    cell: withJsonFormsCellProps(UnknownControl),
  },
]