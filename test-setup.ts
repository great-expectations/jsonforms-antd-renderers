/* eslint-disable @typescript-eslint/unbound-method */
// context: https://github.com/testing-library/jest-dom/pull/511
import "@testing-library/jest-dom/vitest"
import { cleanup } from "@testing-library/react"
import { afterEach } from "vitest"

// Make TypeScript aware of Node.js global object
declare const global: typeof globalThis & {
  IS_REACT_ACT_ENVIRONMENT?: boolean
  matchMedia?: (query: string) => {
    addListener: (listener: () => void) => void
    removeListener: (listener: () => void) => void
  }
}

global.IS_REACT_ACT_ENVIRONMENT = true

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: () => undefined,
      removeListener: () => undefined,
    }
  }

// Workaround for jsdom/nwsapi invalid CSS selector parsing issue with Ant Design
// This patches querySelector and matches to handle invalid selectors gracefully
// The issue occurs when Ant Design generates CSS selectors with multiple consecutive commas
if (typeof document !== "undefined") {
  const originalQuerySelector = Element.prototype.querySelector
  const originalQuerySelectorAll = Element.prototype.querySelectorAll
  const originalMatches = Element.prototype.matches

  // Check if selector has invalid patterns (multiple consecutive commas)
  const hasInvalidSelectorPattern = (selector: string): boolean => {
    if (!selector || typeof selector !== "string") {
      return false
    }
    // Check for multiple consecutive commas which cause nwsapi parsing errors
    // This is the main pattern causing issues: selectors like "input,,,properties"
    return /,{2,}/.test(selector)
  }

  Element.prototype.querySelector = function (
    this: Element,
    selector: string,
  ): Element | null {
    // Always check for invalid patterns first
    if (hasInvalidSelectorPattern(selector)) {
      return null
    }
    // Wrap in try-catch to handle any parsing errors from nwsapi
    try {
      return originalQuerySelector.call(this, selector)
    } catch (e: unknown) {
      // Silently handle SyntaxError from nwsapi parser
      const error = e as Error
      if (
        error instanceof SyntaxError ||
        error?.name === "SyntaxError" ||
        error?.message?.includes("not a valid selector")
      ) {
        return null
      }
      throw e
    }
  }

  Element.prototype.querySelectorAll = function (
    this: Element,
    selector: string,
  ): NodeListOf<Element> {
    // Always check for invalid patterns first
    if (hasInvalidSelectorPattern(selector)) {
      // Return empty NodeList by creating a fragment and querying an impossible selector
      const fragment = document.createDocumentFragment()
      return fragment.querySelectorAll(":not(*)")
    }
    // Wrap in try-catch to handle any parsing errors from nwsapi
    try {
      return originalQuerySelectorAll.call(this, selector)
    } catch (e: unknown) {
      // Silently handle SyntaxError from nwsapi parser
      const error = e as Error
      if (
        error instanceof SyntaxError ||
        error?.name === "SyntaxError" ||
        error?.message?.includes("not a valid selector")
      ) {
        const fragment = document.createDocumentFragment()
        return fragment.querySelectorAll(":not(*)")
      }
      throw e
    }
  }

  Element.prototype.matches = function (
    this: Element,
    selector: string,
  ): boolean {
    // Always check for invalid patterns first
    if (hasInvalidSelectorPattern(selector)) {
      return false
    }
    // Wrap in try-catch to handle any parsing errors from nwsapi
    try {
      return originalMatches.call(this, selector)
    } catch (e: unknown) {
      // Silently handle SyntaxError from nwsapi parser
      const error = e as Error
      if (
        error instanceof SyntaxError ||
        error?.name === "SyntaxError" ||
        error?.message?.includes("not a valid selector")
      ) {
        return false
      }
      throw e
    }
  }
}

afterEach(() => {
  cleanup()
})
