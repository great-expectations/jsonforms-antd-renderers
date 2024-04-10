import { render as RTLrender } from "@testing-library/react"
import { FormStateWrapper, RenderProps } from "./FormStateWrapper"
import { StrictMode } from "react"

export function render<T extends Record<string, unknown>, S>(
  props: RenderProps<T, S>,
) {
  return RTLrender(<FormStateWrapper {...props} />)
}

export function strictRender<T extends Record<string, unknown>, S>(
  props: RenderProps<T, S>,
) {
  return RTLrender(<FormStateWrapper {...props} />, {
    wrapper: StrictMode,
  })
}
