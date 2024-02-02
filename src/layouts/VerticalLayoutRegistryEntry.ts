import { rankWith, uiTypeIs } from "@jsonforms/core";
import { withJsonFormsLayoutProps } from "@jsonforms/react";
import { VerticalLayoutRenderer } from "./VerticalLayout";

export const VerticalLayoutRendererRegistryEntry = {
    tester: rankWith(2, uiTypeIs("VerticalLayout")),
    renderer: withJsonFormsLayoutProps(VerticalLayoutRenderer),
  }