import { useLayoutEffect, useRef, useState } from "react"
import type { FormProps } from "antd"

/**
 * Returns a ref and the detected layout of the nearest ancestor Ant Design Form.
 *
 * Attach `ref` to any element rendered inside the parent Form. The hook reads
 * the CSS class on the closest `.ant-form` ancestor (`ant-form-vertical`,
 * `ant-form-inline`) to determine the layout. When no ancestor form exists or
 * the layout is the default "horizontal", `layout` is `undefined`.
 *
 * We detect layout via the DOM rather than importing antd's internal
 * FormContext because that context is a different object in CJS vs ESM builds,
 * which breaks context sharing when this library is consumed as CJS.
 */
export function useParentFormLayout() {
  const ref = useRef<HTMLSpanElement>(null)
  const [layout, setLayout] = useState<FormProps["layout"]>()

  useLayoutEffect(() => {
    const formEl = ref.current?.closest(".ant-form")
    if (formEl?.classList.contains("ant-form-vertical")) setLayout("vertical")
    else if (formEl?.classList.contains("ant-form-inline")) setLayout("inline")
  }, [])

  return { ref, layout }
}
