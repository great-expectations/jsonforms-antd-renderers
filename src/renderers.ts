import {
  UnknownCellRegistryEntry,
  UnknownRendererRegistryEntry,
} from "./controls/UnknownControlRegistryEntry";
import { VerticalLayoutRendererRegistryEntry } from "./layouts/VerticalLayoutRegistryEntry";

export const renderers = [
  UnknownRendererRegistryEntry,
  VerticalLayoutRendererRegistryEntry,
];
export const cells = [UnknownCellRegistryEntry];
