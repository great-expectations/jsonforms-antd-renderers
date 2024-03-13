import {
  JsonFormsRendererRegistryEntry,
  JsonFormsCellRendererRegistryEntry,
  isBooleanControl,
  isPrimitiveArrayControl,
  isStringControl,
  rankWith,
  uiTypeIs,
  isObjectControl,
  isLayout,
  not,
  and,
} from "@jsonforms/core"
import {
  withJsonFormsArrayControlProps,
  withJsonFormsControlProps,
  withJsonFormsLabelProps,
  withJsonFormsCellProps,
  withJsonFormsLayoutProps,
  withJsonFormsDetailProps,
} from "@jsonforms/react"

import { BooleanControl } from "./controls/BooleanControl"
import { AlertControl } from "./controls/AlertControl"
import { TextControl } from "./controls/TextControl"
import { UnknownControl } from "./controls/UnknownControl"
import { VerticalLayoutRenderer } from "./layouts/VerticalLayoutRenderer"
import { ObjectControl } from "./controls/ObjectControl"
import { GroupLayoutRenderer } from "./layouts/GroupLayoutRenderer"
import { NumericControl } from "./controls/NumericControls/NumericControl"
import { NumericSliderControl } from "./controls/NumericControls/NumericSliderControl"
import { PrimitiveArrayControl } from "./controls/PrimitiveArrayControl";
import React from "react"

import {
  isNumericControl,
  isNumericSliderControl,
} from "./controls/NumericControls/testers"

// Ordered from lowest rank to highest rank. Higher rank renderers will be preferred over lower rank renderers.
export const rendererRegistryEntries: JsonFormsRendererRegistryEntry[] = [
  {
    tester: rankWith(1, () => true),
    renderer: withJsonFormsControlProps(UnknownControl),
  },
  {
    tester: rankWith(1, uiTypeIs("Group")),
    renderer: React.memo(GroupLayoutRenderer),
  },
  {
    tester: rankWith(2, uiTypeIs("VerticalLayout")),
    renderer: withJsonFormsLayoutProps(VerticalLayoutRenderer),
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
    renderer: withJsonFormsLabelProps(AlertControl),
  },
  {
    tester: rankWith(2, isNumericControl),
    renderer: withJsonFormsControlProps(NumericControl),
  },
  {
    tester: rankWith(2, isNumericControl),
    renderer: withJsonFormsControlProps(NumericControl),
  },
  {
    tester: rankWith(2, isNumericControl),
    renderer: withJsonFormsControlProps(NumericControl),
  },
  {
    tester: rankWith(3, isNumericSliderControl),
    renderer: withJsonFormsControlProps(NumericSliderControl),
  },
  {
    tester: rankWith(10, and(isObjectControl, not(isLayout))),
    renderer: withJsonFormsDetailProps(ObjectControl),
  },
  { 
    tester: rankWith(30, isPrimitiveArrayControl), 
    renderer: withJsonFormsArrayControlProps(PrimitiveArrayControl) 
  },
]

export const cellRegistryEntries: JsonFormsCellRendererRegistryEntry[] = [
  {
    tester: rankWith(1, () => true),
    cell: withJsonFormsCellProps(UnknownControl),
  },
]
