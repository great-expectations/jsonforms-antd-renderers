import {
  UnknownCellRegistryEntry,
  UnknownRendererRegistryEntry,
} from "./controls/UnknownControlRegistryEntry";
import { VerticalLayoutRendererRegistryEntry } from "./layouts/VerticalLayoutRegistryEntry";

export const rendererRegistryEntries = [
  UnknownRendererRegistryEntry,
  VerticalLayoutRendererRegistryEntry,
];
export const cellRegistryEntries = [UnknownCellRegistryEntry];
