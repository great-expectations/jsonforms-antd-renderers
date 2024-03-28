import { useEffect, useState } from "react"

/**
 * Hook that returns the last distinct value.
 * returns null until the original value changes
 */
export function usePreviousValue<T>(value: T): T | null {
  const [current, setCurrent] = useState<T | null>(null)
  const [previous, setPrevious] = useState<T | null>(null)

  useEffect(() => {
    if (value !== current) {
      setPrevious(current)
      setCurrent(value)
    }
  }, [value, current])

  return previous
}

export function usePreviousIndex<T>(value: T): T | null {
  const [previous, setPrevious] = useState<T | null>(null)

  useEffect(() => {
    if (value !== previous) {
      setPrevious(value)
    }
  }, [value, previous])

  return previous
}
