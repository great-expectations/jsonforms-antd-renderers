import { test, expect } from "vitest"
import { screen } from "@testing-library/react"
import { render } from "../common/test-render"

import {
  numericMagnitudeSchema,
  numericVerticalUISchema,
} from "../testSchemas/numericSchema"
import { VERTICAL_LAYOUT_FORM_TEST_ID } from "./VerticalLayout"
import { RuleEffect } from "@jsonforms/core"
import { UISchema } from "../ui-schema"

test("Vertical layout renders", async () => {
  render({
    schema: numericMagnitudeSchema,
    uischema: numericVerticalUISchema,
  })
  await screen.findByRole("spinbutton")

  // since we are wrapped in a form no wrapper element should be introduced
  expect(
    screen.queryByTestId(VERTICAL_LAYOUT_FORM_TEST_ID),
  ).not.toBeInTheDocument()
})

test("Vertical layout does not render when visible is false", () => {
  const hiddenVerticalUISchema = {
    type: "VerticalLayout",
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
    uischema: hiddenVerticalUISchema,
  })

  // The layout should not render at all when visible is false
  expect(screen.queryByRole("spinbutton")).not.toBeInTheDocument()
  expect(
    screen.queryByTestId(VERTICAL_LAYOUT_FORM_TEST_ID),
  ).not.toBeInTheDocument()
})
