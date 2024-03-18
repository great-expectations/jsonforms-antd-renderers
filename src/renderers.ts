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
import {
  withJsonFormsControlProps,
  withJsonFormsLabelProps,
  withJsonFormsCellProps,
  withJsonFormsLayoutProps,
  withJsonFormsDetailProps,
} from "@jsonforms/react"

import { BooleanControl } from "./controls/BooleanControl"
import { AlertLayout } from "./layouts/AlertLayout"
import { TextControl } from "./controls/TextControl"
import { UnknownControl } from "./controls/UnknownControl"
import { HorizontalLayout } from "./layouts/HorizontalLayout"
import { VerticalLayout } from "./layouts/VerticalLayout"
import { ObjectControl } from "./controls/ObjectControl"
import { GroupLayout } from "./layouts/GroupLayout"
import { NumericControl } from "./controls/NumericControl"
import { NumericSliderControl } from "./controls/NumericSliderControl"
import React from "react"

// Ordered from lowest rank to highest rank. Higher rank renderers will be preferred over lower rank renderers.
export const rendererRegistryEntries: JsonFormsRendererRegistryEntry[] = [
  {
    tester: rankWith(1, () => true),
    renderer: withJsonFormsControlProps(UnknownControl),
  },
  {
    tester: rankWith(1, uiTypeIs("Group")),
    renderer: React.memo(GroupLayout),
  },
  {
    tester: rankWith(2, uiTypeIs("HorizontalLayout")),
    renderer: withJsonFormsLayoutProps(HorizontalLayout),
  },
  {
    tester: rankWith(2, uiTypeIs("VerticalLayout")),
    renderer: withJsonFormsLayoutProps(VerticalLayout),
  },
  {
    tester: rankWith(2, isBooleanControl),
    renderer: withJsonFormsControlProps(BooleanControl),
  },
  {
    tester: rankWith(2, isStringControl),
    renderer: withJsonFormsControlProps(TextControl),
  },
  {
    tester: rankWith(2, uiTypeIs("Label")),
    renderer: withJsonFormsLabelProps(AlertLayout),
  },
  {
    tester: rankWith(2, or(isNumberControl, isIntegerControl)),
    renderer: withJsonFormsControlProps(NumericControl),
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
    renderer: withJsonFormsControlProps(NumericSliderControl),
  },
  {
    tester: rankWith(10, and(isObjectControl, not(isLayout))),
    renderer: withJsonFormsDetailProps(ObjectControl),
  },
]

export const cellRegistryEntries: JsonFormsCellRendererRegistryEntry[] = [
  {
    tester: rankWith(1, () => true),
    cell: withJsonFormsCellProps(UnknownControl),
  },
]
