import { test } from "vitest"
import { screen } from "@testing-library/react"
import { render } from "../common/test-render"

import {
  numericMagnitudeSchema,
  numericVerticalUISchema,
} from "../testSchemas/numericSchema"

test("Vertical layout renders", async () => {
  render({
    schema: numericMagnitudeSchema,
    uischema: numericVerticalUISchema,
  })
  await screen.findByRole("spinbutton")
})
