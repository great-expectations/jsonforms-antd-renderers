import { render as RTLrender } from "@testing-library/react"
import { JSONSchema } from "json-schema-to-ts"

import { UISchema } from "../ui-schema"
import { FormStateWrapper } from "./FormStateWrapper"

type RenderProps<T extends Record<string, unknown>> = {
  schema: JSONSchema
  data?: T
  uischema?: UISchema
  onChange?: (result: { data: T }) => void
}

export function render<T extends Record<string, unknown>>(
  props: RenderProps<T>,
) {
  return RTLrender(<FormStateWrapper {...props} />)
}
