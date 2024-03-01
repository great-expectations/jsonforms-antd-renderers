import { vi } from "vitest"
import { JsonForms } from "@jsonforms/react"
import { render as RTLrender } from "@testing-library/react"
import { Form } from "antd"
import { cellRegistryEntries, rendererRegistryEntries } from "./renderers"
import { JSONSchema } from "json-schema-to-ts"
import { UISchema } from "./ui-schema"
import { JsonSchema7 } from "@jsonforms/core"

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }
  }

type RenderProps<T> = {
  schema: JSONSchema
  data?: T
  uischema?: UISchema
  onChange?: (result: { data: T }) => void
}

export function render<T>({ schema, data, uischema, onChange }: RenderProps<T>): ReturnType<typeof RTLrender>{
  return RTLrender(
      <Form>
        <JsonForms
          schema={schema as JsonSchema7}
          uischema={uischema}
          renderers={rendererRegistryEntries}
          cells={cellRegistryEntries}
          data={data}
          {...(onChange ? { onChange } : {})}
        />
      </Form>
  )
}
