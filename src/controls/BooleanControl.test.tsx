import { test, expect, vi } from "vitest"
import { screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { render } from "../common/test-render"

test("renders the Checkbox component", async () => {
  render({
    schema: {
      type: "object",
      properties: { adult: { type: "boolean", title: "Adult" } },
    },
  })

  const checkbox = await screen.findByLabelText("Adult")
  expect(checkbox).toBeInTheDocument()
  expect(checkbox).not.toBeChecked()
  expect(checkbox).toBeEnabled()
  // check that there is an checkbox
  expect(checkbox.tagName).toBe("INPUT")
  expect(checkbox.getAttribute("type")).toBe("checkbox")
})

test("handles onChange event correctly", async () => {
  const updateData = vi.fn()
  render({
    schema: {
      type: "object",
      properties: { name: { type: "boolean", title: "Name" } },
    },
    data: { name: false },
    onChange: (result) => {
      updateData(result)
    },
  })

  const checkbox = await screen.findByLabelText("Name")
  expect(checkbox).not.toBeChecked()

  await userEvent.click(checkbox)
  expect(checkbox).toBeChecked()
  // FYI the calls to updateData lag behind the actual checkbox state. Not sure why.
  // It could be the difference between json-forms handleChange(path, value) and the onChange event.
  expect(updateData).toHaveBeenLastCalledWith({
    data: { name: false },
    errors: [],
  })

  await userEvent.click(checkbox)
  expect(checkbox).not.toBeChecked()
  expect(updateData).toHaveBeenLastCalledWith({
    data: { name: true },
    errors: [],
  })

  expect(updateData).toBeCalledTimes(2)
})
