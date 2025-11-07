import { createContext, useContext } from "react"

export interface AnyOfContextValue {
  anyOfIndex: number | undefined
}

export const AnyOfIndexContext = createContext<number | undefined>(undefined)
export const useAnyOfContext = () => {
  return useContext(AnyOfIndexContext)
}
