import { createContext, useContext } from "react"

export interface AnyOfContextValue {
  anyOfIndex: number | undefined
}

export interface ArrayIndexContextValue {
  path: string
  index: number
}
export const ArrayIndexContext = createContext<
  ArrayIndexContextValue | undefined
>(undefined)
export const useArrayIndexContext = () => {
  return useContext(ArrayIndexContext)
}
