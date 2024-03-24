import { render as RTLrender } from "@testing-library/react"
import { FormStateWrapper, RenderProps } from "./FormStateWrapper"

export function render<T extends Record<string, unknown>>(
  props: RenderProps<T>,
) {
  return RTLrender(<FormStateWrapper {...props} />)
}
