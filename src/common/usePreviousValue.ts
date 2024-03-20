import { useEffect, useState } from "react"

/**
 * Hook that returns the what was passed in the previous render.
 * On the first render, returns undefined. Eventually
 * "catches up" to the current value.
 */
export function usePreviousValue<T>(value: T): T | undefined {
  const [prev, setPrev] = useState<T | undefined>(undefined)

  useEffect(() => {
    if (value !== prev) {
      setPrev(value)
    }
  }, [value, prev])

  return prev
}
