import { test, expect } from "vitest"
import { screen } from "@testing-library/react"
import { render } from "../common/test-render"

import {
  numericMagnitudeSchema,
  numericHorizontalUISchema,
} from "../testSchemas/numericSchema"
import { HORIZONTAL_LAYOUT_FORM_TEST_ID } from "./HorizontalLayout"

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
