import { describe, expect, test } from "vitest"
import {
  decimalToPercentage,
  percentageStringToDecimal,
  areStringNumbersEqual,
} from "./utils"

describe("percentageStringToDecimal", () => {
  test.each([
    { value: "100", expected: 1 },
    { value: "0", expected: 0 },
    { value: "50", expected: 0.5 },
    { value: "0.5", expected: 0.005 },
    { value: "0.005", expected: 0.00005 },
    { value: "0.066", expected: 0.00066 },
    { value: "85.9999999999", expected: 0.859999999999 },
  ])(
    "when value is $value it returns $expected",
    ({ value, expected }: { value: string; expected: number }) => {
      expect(percentageStringToDecimal(value)).toEqual(expected)
    },
  )
})

describe("decimalToPercentage", () => {
  test.each([
    { value: 1, expected: "100" },
    { value: 0, expected: "0" },
    { value: 0.5, expected: "50" },
    { value: 0.005, expected: "0.5" },
    { value: 0.00005, expected: "0.005" },
    { value: 0.859999999999, expected: "85.9999999999" },
  ])(
    "when value is $value it returns $expected. If symbol is provided, it is appended to the value",
    ({ value, expected }: { value: number; expected: string }) => {
      expect(decimalToPercentage(value)).toEqual(expected)
    },
  )
})

describe("areStringNumbersEqual", () => {
  test.each([
    ["0", 0, true],
    ["0", "0", true],
    ["0000", 0, true],
    ["0000", "00", true],
    ["00567", 567, true],
    ["00567", "567", true],
    ["567", 567, true],
    ["567", "567", true],
    ["aaa", NaN, false],
    ["NaN", NaN, false],
    ["aaa", "aaa", false],
    ["aaa", 0, false],
    ["00567", "00568", false],
    ["00567", 568, false],
    ["567", 568, false],
  ])("areStringNumbersEqual(%o, %o) -> %o", (a, b, expected) => {
    expect(areStringNumbersEqual(a, b)).toBe(expected)
  })
})
