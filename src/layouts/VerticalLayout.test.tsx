import { test, expect } from "vitest"
import { screen } from "@testing-library/react"
import { render } from "../common/test-render"

import {
  numericMagnitudeSchema,
  numericVerticalUISchema,
} from "../testSchemas/numericSchema"
import { VERTICAL_LAYOUT_FORM_TEST_ID } from "./VerticalLayout"

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
