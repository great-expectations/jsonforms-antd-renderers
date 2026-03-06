import { useLayoutEffect, useRef, useState } from "react"
import type { FormProps } from "antd"

/**
 * Detects the parent Ant Design Form's layout by inspecting the nearest
 * ancestor `.ant-form` element's CSS classes. This avoids importing antd's
 * internal FormContext, which breaks across CJS/ESM module boundaries.
 */
export function useParentFormLayout() {
  const probeRef = useRef<HTMLSpanElement>(null)
  const [layout, setLayout] = useState<FormProps["layout"]>()

  useLayoutEffect(() => {
    const el = probeRef.current
    if (!el) return
    const formEl = el.closest(".ant-form")
    if (!formEl) return
    if (formEl.classList.contains("ant-form-vertical")) setLayout("vertical")
    else if (formEl.classList.contains("ant-form-inline")) setLayout("inline")
  }, [])

  return { probeRef, layout }
}
