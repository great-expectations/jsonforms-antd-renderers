import { test, expect, vi } from "vitest"
import { screen, waitFor } from "@testing-library/react"
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
      console.log(result)
      updateData(result)
    },
  })

  const checkbox = await screen.findByLabelText("Name")
  expect(checkbox).not.toBeChecked()

  await userEvent.click(checkbox)
  expect(checkbox).toBeChecked()
  await waitFor(() =>
    expect(updateData).toHaveBeenLastCalledWith({
      data: { name: true },
      errors: [],
    }),
  )

  await userEvent.click(checkbox)
  expect(checkbox).not.toBeChecked()
  await waitFor(() =>
    expect(updateData).toHaveBeenLastCalledWith({
      data: { name: false },
      errors: [],
    }),
  )
})
