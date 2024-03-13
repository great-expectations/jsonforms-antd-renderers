import { test, expect } from "vitest"
import { screen } from "@testing-library/react"
import { render } from "../common/test-render"

test("renders Checkbox component with default label", async () => {
  render({
    schema: {
      type: "object",
      properties: { name: { type: "boolean", title: "Name" } },
    },
    data: { name: true },
  })

  const checkbox = await screen.findByLabelText("Name")
  expect(checkbox).toBeChecked()
})
