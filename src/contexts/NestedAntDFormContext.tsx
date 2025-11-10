import { createContext } from "react"

export interface AnyOfContextValue {
  anyOfIndex: number | undefined
}

export interface NestedAntDFormData {
  path: string
  index?: number
}

/**
 * Context to store the nested AntD form data.
 *
 * This is used for for passing down data across nested form items in places
 * where we use JsonFormsDispatch to render nested form items.
 */
export const NestedAntDFormContext = createContext<
  NestedAntDFormData | undefined
>(undefined)
