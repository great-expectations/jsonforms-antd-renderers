import {
  UnknownCellRegistryEntry,
  UnknownRendererRegistryEntry,
} from "./controls/UnknownControlRegistryEntry";
import { VerticalLayoutRendererRegistryEntry } from "./layouts/VerticalLayoutRegistryEntry";
import { TextControlRegistryEntry } from "./stories/controls/TextControlRegistryEntry";

export const rendererRegistryEntries = [
  UnknownRendererRegistryEntry,
  VerticalLayoutRendererRegistryEntry,
  TextControlRegistryEntry
];
export const cellRegistryEntries = [UnknownCellRegistryEntry];
