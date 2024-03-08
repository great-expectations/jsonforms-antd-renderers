import { JsonFormsRendererRegistryEntry,JsonFormsCellRendererRegistryEntry, isBooleanControl, isNumberControl, isStringControl, rankWith, uiTypeIs } from "@jsonforms/core";
import { withJsonFormsControlProps, withJsonFormsLabelProps, withJsonFormsCellProps, withJsonFormsLayoutProps } from "@jsonforms/react";

import { BooleanControl } from "./controls/BooleanControl";
import { AlertControl } from "./controls/AlertControl";
import { TextControl } from "./controls/TextControl";
import { UnknownControl } from "./controls/UnknownControl";
import { VerticalLayoutRenderer } from "./layouts/VerticalLayout";
import { NumericControl } from "./controls/NumericControls/NumericControl";
import { NumericSliderControl } from "./controls/NumericControls/NumericSliderControl";

import { isNumericControl, isNumericSliderControl } from "./controls/NumericControls/testers";


// Ordered from lowest rank to highest rank. Higher rank renderers will be preferred over lower rank renderers.
export const rendererRegistryEntries: JsonFormsRendererRegistryEntry[] = [
  { tester: rankWith(1, () => true), renderer: withJsonFormsControlProps(UnknownControl) },
  { tester: rankWith(2, uiTypeIs("VerticalLayout")), renderer: withJsonFormsLayoutProps(VerticalLayoutRenderer) },
  { tester: rankWith(2, isBooleanControl), renderer: withJsonFormsControlProps(BooleanControl) },
  { tester: rankWith(2, isStringControl), renderer: withJsonFormsControlProps(TextControl) },
  { tester: rankWith(2, uiTypeIs("Label")), renderer: withJsonFormsLabelProps(AlertControl) },
  { tester: rankWith(2, isNumericControl), renderer: withJsonFormsControlProps(NumericControl)},
  { tester: rankWith(3, isNumericSliderControl), renderer: withJsonFormsControlProps(NumericSliderControl) },
];

export const cellRegistryEntries: JsonFormsCellRendererRegistryEntry[] = [
  { tester: rankWith(1, () => true), cell: withJsonFormsCellProps(UnknownControl)}
];
