// context: https://github.com/testing-library/jest-dom/pull/511
import "@testing-library/jest-dom/vitest"
import { cleanup } from "@testing-library/react"
import { afterEach } from "vitest"

// TODO: figure out if this is still necessary:
// @ts-expect-error ignore -- this solves issue where RTL throws this error "this environment not configured for act"
global.IS_REACT_ACT_ENVIRONMENT = true

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: () => undefined,
      removeListener: () => undefined,
    }
  }

afterEach(() => {
  cleanup()
})
