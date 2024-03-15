import { test } from "vitest"
import { screen } from "@testing-library/react"
import { render } from "../common/test-render"

import {
  numericMagnitudeSchema,
  numericHorizontalUISchema,
} from "../testSchemas/numericSchema/numericSchema"

test("Horizontal layout renders", async () => {
  render({
    schema: numericMagnitudeSchema,
    uischema: numericHorizontalUISchema,
  })
  await screen.findByRole("spinbutton")
})
