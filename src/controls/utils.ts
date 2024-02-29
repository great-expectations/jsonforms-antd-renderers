export function decimalToPercentage(value?: number) {
  if (value === undefined) return ""
  const percentage = parseFloat((value * 100).toFixed(10)) // accounting for 10 decimal places
  return `${percentage}`
}

export function percentageStringToDecimal(value: string | undefined) {
  return Number(value) / 100
}
