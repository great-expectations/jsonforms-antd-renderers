import { useContext } from "react"
import {
  NestedAntDFormContext,
  NestedAntDFormData,
} from "../contexts/NestedAntDFormContext"

/**
 * Hook to get the nested AntD form context
 */
export const useNestedAntDFormContext = (): NestedAntDFormData | undefined => {
  return useContext(NestedAntDFormContext)
}
