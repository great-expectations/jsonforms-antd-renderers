import { useContext } from "react"
import { NestedAntDFormContext } from "../contexts/NestedAntDFormContext"

/**
 * Hook to get the nested AntD form context
 */
export const useNestedAntDFormContext = () => {
  return useContext(NestedAntDFormContext)
}
