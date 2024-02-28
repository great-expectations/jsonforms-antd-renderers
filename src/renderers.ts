import { BooleanControlRegistryEntry } from "./controls/BooleanControlRegistryEntry";
import {
  UnknownCellRegistryEntry,
  UnknownRendererRegistryEntry,
} from "./controls/UnknownControlRegistryEntry";
import { VerticalLayoutRendererRegistryEntry } from "./layouts/VerticalLayoutRegistryEntry";
import { TextControlRegistryEntry } from "./stories/controls/TextControlRegistryEntry";

export const rendererRegistryEntries = [
  BooleanControlRegistryEntry,
  UnknownRendererRegistryEntry,
  VerticalLayoutRendererRegistryEntry,
  TextControlRegistryEntry
];
export const cellRegistryEntries = [UnknownCellRegistryEntry];
