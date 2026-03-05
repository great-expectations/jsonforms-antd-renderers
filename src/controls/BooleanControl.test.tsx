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
  expect(checkbox).not.toBeChecked()
  expect(checkbox).toBeEnabled()
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

test("renders label on Form.Item when formItemLabel option is true", async () => {
  render({
    schema: {
      type: "object",
      properties: { agree: { type: "boolean", title: "I agree" } },
    },
    uischema: {
      type: "VerticalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/agree" as const,
          options: { formItemLabel: true },
        },
      ],
    } as Parameters<typeof render>[0]["uischema"],
  })

  await screen.findByRole("checkbox")
  // label should be rendered as a Form.Item label, not inline with the checkbox
  expect(screen.queryByLabelText("I agree")).toBeNull()
  await screen.findByText("I agree")
})

test("renders inline label by default", async () => {
  render({
    schema: {
      type: "object",
      properties: { agree: { type: "boolean", title: "I agree" } },
    },
  })

  await screen.findByLabelText("I agree")
})
