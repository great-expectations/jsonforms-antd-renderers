import { render as RTLrender } from "@testing-library/react"

import { UISchema } from "../ui-schema"
import { FormStateWrapper } from "./FormStateWrapper"

type RenderProps<T extends Record<string, unknown>, S> = {
  schema: S
  data?: T
  uischema?: UISchema<S>
  onChange?: (result: { data: T }) => void
}

export function render<T extends Record<string, unknown>, S>(
  props: RenderProps<T, S>,
) {
  return RTLrender(<FormStateWrapper {...props} />)
}
