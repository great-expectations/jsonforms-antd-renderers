import {
  JsonFormsCellRendererRegistryEntry,
  JsonFormsRendererRegistryEntry,
  rankWith,
} from "@jsonforms/core";
import {
  withJsonFormsCellProps,
  withJsonFormsControlProps,
} from "@jsonforms/react";
import { UnknownControl } from "./UnknownControl";

export const UnknownRendererRegistryEntry: JsonFormsRendererRegistryEntry = {
  renderer: withJsonFormsControlProps(UnknownControl),
  tester: rankWith(1, () => true),
};
export const UnknownCellRegistryEntry: JsonFormsCellRendererRegistryEntry = {
  cell: withJsonFormsCellProps(UnknownControl),
  tester: rankWith(1, () => true),
};
