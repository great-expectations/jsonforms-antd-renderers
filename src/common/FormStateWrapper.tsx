import { JsonForms } from "@jsonforms/react";
import { JSONSchema } from "json-schema-to-ts";
import { Form } from "antd";

import { JsonSchema7 } from "@jsonforms/core";
import { UISchema } from "../ui-schema";
import { cellRegistryEntries, rendererRegistryEntries } from "../renderers";
import { useState } from "react";

type RenderProps<T> = {
  schema: JSONSchema;
  data?: T;
  uischema?: UISchema;
  onChange?: (result: { data: T }) => void;
};

export function FormStateWrapper<T>({
  schema,
  uischema,
  data: initialData,
  onChange,
}: RenderProps<T>) {
  const [data, setData] = useState(initialData);
  return (
    <Form>
      <JsonForms
        schema={schema as JsonSchema7}
        uischema={uischema}
        renderers={rendererRegistryEntries}
        cells={cellRegistryEntries}
        data={data}
        {...(onChange
          ? { onChange }
          : {
              onChange: (result) =>
                setData(result.data as T),
            })}
      />
    </Form>
  );
}
