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
          scope: "#/properties/agree",
          options: { formItemLabel: true },
        },
      ],
    },
  })

  const checkbox = await screen.findByRole("checkbox")
  expect(checkbox).toBeInTheDocument()
  // label should be on the Form.Item, not inline in the checkbox
  const formItemLabel = document.querySelector(".ant-form-item-label")
  expect(formItemLabel).toBeInTheDocument()
  expect(formItemLabel?.textContent).toContain("I agree")
  // checkbox should have no inline label text
  const checkboxLabel = checkbox
    .closest("label")
    ?.querySelector(".ant-checkbox-label")
  expect(checkboxLabel?.textContent).toBe("")
})

test("renders inline label by default", async () => {
  render({
    schema: {
      type: "object",
      properties: { agree: { type: "boolean", title: "I agree" } },
    },
  })

  const checkbox = await screen.findByLabelText("I agree")
  expect(checkbox).toBeInTheDocument()
  // checkbox should have inline label text
  const checkboxLabel = checkbox
    .closest("label")
    ?.querySelector(".ant-checkbox-label")
  expect(checkboxLabel?.textContent).toBe("I agree")
})
