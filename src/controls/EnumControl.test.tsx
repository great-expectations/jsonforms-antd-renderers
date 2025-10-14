import { test, expect, vi } from "vitest"
import { screen, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { render } from "../common/test-render"
import {
  enumPSISchema,
  enumPSIUISchema,
  enumProfessionSchema,
  enumProfessionUISchema,
  enumSnakeCaseSchema,
  enumSnakeCaseUISchema,
} from "../testSchemas/enumSchema"

test("renders the enum component as radio optionType", () => {
  render({
    schema: enumPSISchema,
    uischema: enumPSIUISchema,
  })

  const radioButtons = screen.getAllByRole("radio")
  expect(radioButtons).toHaveLength(3)
})

test("renders the enum component as dropdown optionType", () => {
  render({
    schema: enumProfessionSchema,
    uischema: enumProfessionUISchema,
  })

  screen.getByRole("combobox")
})

test("renders the enum component with custom titles", async () => {
  render({
    schema: enumSnakeCaseSchema,
    uischema: enumSnakeCaseUISchema,
  })

  await userEvent.click(screen.getByRole("combobox"))
  screen.getByTitle("Option 1")
  screen.getByTitle("Option 2")
  screen.getByTitle("Option 3")
})

test("handles onChange event correctly", async () => {
  const updateData = vi.fn()
  render({
    schema: enumProfessionSchema,
    data: { profession: "Bob Ross Impersonator" },
    onChange: (result) => {
      updateData(result)
    },
  })

  screen.getByTitle("Bob Ross Impersonator")
  const combobox = screen.getByRole("combobox")

  await userEvent.click(combobox)
  await userEvent.click(screen.getByTitle("Footballer"))
  await waitFor(() =>
    expect(updateData).toHaveBeenLastCalledWith({
      data: { profession: "Footballer" },
      errors: [],
    }),
  )

  await userEvent.click(combobox)
  await userEvent.click(screen.getByTitle("Software Engineer"))
  await waitFor(() =>
    expect(updateData).toHaveBeenLastCalledWith({
      data: { profession: "Software Engineer" },
      errors: [],
    }),
  )
})

test("validates required field on form submission - dropdown", async () => {
  render({
    schema: enumProfessionSchema,
    uischema: enumProfessionUISchema,
    data: {},
  })

  // Click submit button to trigger validation
  const submitButton = screen.getByRole("button", { name: "Submit" })
  await userEvent.click(submitButton)

  await waitFor(() => {
    screen.getByText("Profession is required")
  })
})

test("validates required field on form submission - radio", async () => {
  render({
    schema: enumProfessionSchema,
    uischema: {
      type: "VerticalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/profession",
          options: { optionType: "radio" },
        },
      ],
    },
    data: {},
  })

  // Click submit button to trigger validation
  const submitButton = screen.getByRole("button", { name: "Submit" })
  await userEvent.click(submitButton)

  await waitFor(() => {
    screen.getByText("Profession is required")
  })
})

test("clears validation error on valid selection - dropdown", async () => {
  render({
    schema: enumProfessionSchema,
    uischema: enumProfessionUISchema,
    data: {},
  })

  // First trigger validation error
  const submitButton = screen.getByRole("button", { name: "Submit" })
  await userEvent.click(submitButton)

  await waitFor(() => {
    screen.getByText("Profession is required")
  })

  // Now select a valid value
  const combobox = screen.getByRole("combobox")
  await userEvent.click(combobox)
  await userEvent.click(screen.getByTitle("Software Engineer"))

  // Try submitting again - should not show validation error
  await userEvent.click(submitButton)

  await waitFor(() => {
    expect(screen.queryByText("Profession is required")).not.toBeInTheDocument()
  })
})

test("clears validation error on valid selection - radio", async () => {
  render({
    schema: enumProfessionSchema,
    uischema: {
      type: "VerticalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/profession",
          options: { optionType: "radio" },
        },
      ],
    },
    data: {},
  })

  // First trigger validation error
  const submitButton = screen.getByRole("button", { name: "Submit" })
  await userEvent.click(submitButton)

  await waitFor(() => {
    screen.getByText("Profession is required")
  })

  // Select a valid value by clicking the label instead of the radio input
  await userEvent.click(screen.getByText("Software Engineer"))

  // Try submitting again - should not show validation error
  await userEvent.click(submitButton)

  await waitFor(() => {
    expect(screen.queryByText("Profession is required")).not.toBeInTheDocument()
  })
})

test("validates on change for dropdown", async () => {
  const onChange = vi.fn()
  render({
    schema: enumProfessionSchema,
    uischema: enumProfessionUISchema,
    data: {},
    onChange,
  })

  const combobox = screen.getByRole("combobox")

  // Select a value and verify onChange is called with no errors
  await userEvent.click(combobox)
  await userEvent.click(screen.getByTitle("Software Engineer"))

  await waitFor(() => {
    expect(onChange).toHaveBeenCalledWith({
      data: { profession: "Software Engineer" },
      errors: [],
    })
  })
})

test("validates on change for segmented control", async () => {
  const onChange = vi.fn()
  render({
    schema: {
      type: "object",
      properties: {
        size: {
          title: "Size",
          type: "string",
          enum: ["S", "M", "L"],
        },
      },
      required: ["size"],
    },
    uischema: {
      type: "VerticalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/size",
          options: { optionType: "segmented" },
        },
      ],
    },
    data: {},
    onChange,
  })

  // Click on a segmented option - note that segmented starts with first option selected by default
  // So we click a different option to see the change
  const segmentedOption = screen.getByText("M")
  await userEvent.click(segmentedOption)

  await waitFor(() => {
    expect(onChange).toHaveBeenCalledWith({
      data: { size: "M" },
      errors: [],
    })
  })
})

test("handles validation for segmented control on form submission", async () => {
  render({
    schema: {
      type: "object",
      properties: {
        size: {
          title: "Size",
          type: "string",
          enum: ["S", "M", "L"],
        },
      },
      required: ["size"],
    },
    uischema: {
      type: "VerticalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/size",
          options: { optionType: "segmented" },
        },
      ],
    },
    data: {},
  })

  // Click submit button to trigger validation
  const submitButton = screen.getByRole("button", { name: "Submit" })
  await userEvent.click(submitButton)

  await waitFor(() => {
    screen.getByText("Size is required")
  })
})
