import { BooleanControlRegistryEntry } from "./controls/BooleanControlRegistryEntry";
import { LabelRendererRegistryEntry } from "./controls/LabelRendererRegistryEntry";
import { NumberControlRegistryEntry } from "./controls/NumberControlRegistryEntry";
import { TextControlRegistryEntry } from "./stories/controls/TextControlRegistryEntry";
import {
  UnknownCellRegistryEntry,
  UnknownRendererRegistryEntry,
} from "./controls/UnknownControlRegistryEntry";
import { VerticalLayoutRendererRegistryEntry } from "./layouts/VerticalLayoutRegistryEntry";

export const rendererRegistryEntries = [
  BooleanControlRegistryEntry,
  LabelRendererRegistryEntry,
  NumberControlRegistryEntry,
  TextControlRegistryEntry,
  UnknownRendererRegistryEntry,
  VerticalLayoutRendererRegistryEntry,
];
export const cellRegistryEntries = [UnknownCellRegistryEntry];
