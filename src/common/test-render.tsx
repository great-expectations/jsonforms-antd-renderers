import { render as RTLrender } from "@testing-library/react"
import { FormStateWrapper, RenderProps } from "./FormStateWrapper"

export function render<T extends Record<string, unknown>, S>(
  props: RenderProps<T, S>,
) {
  return RTLrender(<FormStateWrapper {...props} />)
}
