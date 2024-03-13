import { test, expect } from "vitest"
import { screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { render } from "../common/test-render"

test("falls back to default value if value is undefined", async () => {
  render({
    schema: {
      type: "object",
      properties: { name: { type: "string", title: "name" } },
    },
    data: {},
  })
  const input = await screen.findByLabelText("name")
  await userEvent.type(input, "abc")
  await screen.findByDisplayValue("abc")
  expect(input).toHaveValue("abc")
})
