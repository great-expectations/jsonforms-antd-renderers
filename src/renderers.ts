import { BooleanControlRegistryEntry } from "./controls/BooleanControlRegistryEntry";
import { LabelRendererRegistryEntry } from "./controls/LabelRendererRegistryEntry";
import { TextControlRegistryEntry } from "./stories/controls/TextControlRegistryEntry";
import {
  UnknownCellRegistryEntry,
  UnknownRendererRegistryEntry,
} from "./controls/UnknownControlRegistryEntry";
import { VerticalLayoutRendererRegistryEntry } from "./layouts/VerticalLayoutRegistryEntry";

export const rendererRegistryEntries = [
  BooleanControlRegistryEntry,
  LabelRendererRegistryEntry,
  TextControlRegistryEntry,
  UnknownRendererRegistryEntry,
  VerticalLayoutRendererRegistryEntry,
];
export const cellRegistryEntries = [UnknownCellRegistryEntry];
