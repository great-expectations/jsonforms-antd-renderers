import { createContext, useContext } from "react"

export interface AnyOfContextValue {
  anyOfIndex: number | undefined
}

export interface NestedAntDFormData {
  path: string
  index?: number
}
export const NestedAntDFormContext = createContext<
  NestedAntDFormData | undefined
>(undefined)
export const useNestedAntDFormContext = () => {
  return useContext(NestedAntDFormContext)
}
