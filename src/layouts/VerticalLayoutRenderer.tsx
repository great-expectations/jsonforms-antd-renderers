import { LayoutProps, GroupLayout } from "@jsonforms/core";
import {
  AntDLayoutRenderer,
  AntDLayoutRendererProps,
} from "./LayoutRenderer";
import { Form, FormInstance, FormProps } from "antd";
import { VerticalLayout } from "../ui-schema";

export function VerticalLayoutRenderer({
  uischema,
  schema,
  path,
  enabled,
  visible,
  renderers,
  cells,
}: LayoutProps) {
  const verticalLayout = uischema as VerticalLayout;
  const groupLayout = uischema as GroupLayout;
  const childProps: AntDLayoutRendererProps = {
    elements: verticalLayout.elements,
    schema,
    path,
    enabled,
    visible,
  };
  const form = Form.useFormInstance();
  return (
    <Form {...getFormLayoutOptions(form)} form={form}>
      {!groupLayout.label && (
        <div>{groupLayout.label}</div> // this was SubtitleSemiBold
      )}
      <AntDLayoutRenderer {...childProps} renderers={renderers} cells={cells} />
    </Form>
  );
}

function getFormLayoutOptions(form: FormInstance): Partial<FormProps> {
  return {
    scrollToFirstError: true,
    component: form ? "div" : "form",
  };
}
