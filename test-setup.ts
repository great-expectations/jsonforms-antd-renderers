// context: https://github.com/testing-library/jest-dom/pull/511
import "@testing-library/jest-dom/vitest"
import { cleanup } from "@testing-library/react"
import { afterEach } from "vitest"

// TODO: Fix TypeScript version compatibility with ESLint
// @ts-expect-error ignore -- this solves issue where RTL throws this error "this environment not configured for act"
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
global.IS_REACT_ACT_ENVIRONMENT = true

// TODO: Fix TypeScript version compatibility with ESLint
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
global.matchMedia =
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
