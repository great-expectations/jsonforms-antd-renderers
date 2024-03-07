import { createNumericControl } from "./NumericControl"

export const NumberControl = createNumericControl({
  coerceNumber: (value) => Number(value),
})
