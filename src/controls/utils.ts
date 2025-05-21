export function decimalToPercentage(value?: number) {
  if (value === undefined) return ""
  const percentage = parseFloat((value * 100).toFixed(10)) // accounting for 10 digits after the decimal point
  return `${percentage}`
}

export function percentageStringToDecimal(value: string | undefined) {
  return Number(value) / 100
}

export const coerceToInteger = (value: number) => Math.round(value)

export const coerceToNumber = (value: number) => Number(value)

export const areStringNumbersEqual = (
  rawValue: string,
  value: string | number,
): boolean => {
  /**
   * Returns true if both inputs represent numbers and are equal.
   */
  // If a string is not parsable as a number, parseFloat will return NaN.
  const parsedRawValue = parseFloat(rawValue)
  const parsedValue = typeof value === "string" ? parseFloat(value) : value
  if (!isNaN(parsedRawValue) && parsedRawValue === parsedValue) {
    return true
  }
  return false
}
