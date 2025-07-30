import { test, expect } from "vitest"
import { screen } from "@testing-library/react"
import { render } from "../common/test-render"

import {
  numericMagnitudeSchema,
  numericHorizontalUISchema,
} from "../testSchemas/numericSchema"
import { HORIZONTAL_LAYOUT_FORM_TEST_ID } from "./HorizontalLayout"
import { RuleEffect } from "@jsonforms/core"
import { UISchema } from "../ui-schema"

test("Horizontal layout renders", async () => {
  render({
    schema: numericMagnitudeSchema,
    uischema: numericHorizontalUISchema,
  })
  await screen.findByRole("spinbutton")
  // since we are wrapped in a form no wrapper element should be introduced
  expect(
    screen.queryByTestId(HORIZONTAL_LAYOUT_FORM_TEST_ID),
  ).not.toBeInTheDocument()
})

test("Horizontal layout does not render when visible is false", () => {
  const hiddenHorizontalUISchema = {
    type: "HorizontalLayout",
    rule: {
      effect: RuleEffect.HIDE,
      condition: {},
    },
    elements: [
      {
        type: "Control",
        scope: "#/properties/numericValue",
      },
    ],
  } satisfies UISchema<typeof numericMagnitudeSchema>

  render({
    schema: numericMagnitudeSchema,
    uischema: hiddenHorizontalUISchema,
  })

  // The layout should not render at all when visible is false
  expect(screen.queryByRole("spinbutton")).not.toBeInTheDocument()
  expect(
    screen.queryByTestId(HORIZONTAL_LAYOUT_FORM_TEST_ID),
  ).not.toBeInTheDocument()
})
