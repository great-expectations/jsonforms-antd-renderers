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
  enumSizeSchema,
  enumSizeUISchema,
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

test("validates field when user clicks radio button value", async () => {
  const updateData = vi.fn()
  render({
    schema: enumPSISchema,
    uischema: enumPSIUISchema,
    onChange: (result) => {
      updateData(result)
    },
  })

  const radioLabel = screen.getByText("100")
  await userEvent.click(radioLabel)

  await waitFor(() =>
    expect(updateData).toHaveBeenLastCalledWith({
      data: { psi: 100 },
      errors: [],
    }),
  )

  const radioButtons = screen.getAllByRole("radio")
  expect(radioButtons[0]).toBeChecked()
})

test("validates field when user clicks segmented control value", async () => {
  const updateData = vi.fn()
  render({
    schema: enumSizeSchema,
    uischema: enumSizeUISchema,
    onChange: (result) => {
      updateData(result)
    },
  })

  const segmentedOption = screen.getByTitle("L")
  await userEvent.click(segmentedOption)

  await waitFor(() =>
    expect(updateData).toHaveBeenLastCalledWith({
      data: { size: "L" },
      errors: [],
    }),
  )
})

test("validates field when user types and selects dropdown value", async () => {
  const updateData = vi.fn()
  render({
    schema: enumProfessionSchema,
    uischema: enumProfessionUISchema,
    onChange: (result) => {
      updateData(result)
    },
  })

  const combobox = screen.getByRole("combobox")

  await userEvent.click(combobox)
  await userEvent.type(combobox, "Soft")

  await userEvent.click(screen.getByTitle("Software Engineer"))

  await waitFor(() =>
    expect(updateData).toHaveBeenLastCalledWith({
      data: { profession: "Software Engineer" },
      errors: [],
    }),
  )
})

test("validates required field shows error when submitted without value", async () => {
  render({
    schema: enumProfessionSchema,
    uischema: enumProfessionUISchema,
  })

  const submitButton = screen.getByRole("button", { name: "Submit" })
  await userEvent.click(submitButton)

  await waitFor(() => {
    screen.getByText("Profession is required")
  })
})

test("validates required field clears error when value selected", async () => {
  const updateData = vi.fn()
  render({
    schema: enumProfessionSchema,
    uischema: enumProfessionUISchema,
    onChange: (result) => {
      updateData(result)
    },
  })

  const submitButton = screen.getByRole("button", { name: "Submit" })
  await userEvent.click(submitButton)

  await waitFor(() => {
    screen.getByText("Profession is required")
  })

  const combobox = screen.getByRole("combobox")
  await userEvent.click(combobox)
  await userEvent.click(screen.getByTitle("Footballer"))

  await waitFor(() => {
    expect(updateData).toHaveBeenLastCalledWith({
      data: { profession: "Footballer" },
      errors: [],
    })
  })

  await userEvent.click(submitButton)

  await waitFor(() => {
    expect(screen.queryByText("Profession is required")).not.toBeInTheDocument()
  })
})

test("validates dropdown search functionality preserves validation", async () => {
  const updateData = vi.fn()
  render({
    schema: enumProfessionSchema,
    uischema: enumProfessionUISchema,
    data: { profession: "Footballer" },
    onChange: (result) => {
      updateData(result)
    },
  })

  const combobox = screen.getByRole("combobox")

  screen.getByTitle("Footballer")

  await userEvent.click(combobox)
  await userEvent.clear(combobox)
  await userEvent.type(combobox, "Beat")

  await userEvent.click(screen.getByTitle("Beat Boxer"))

  await waitFor(() =>
    expect(updateData).toHaveBeenLastCalledWith({
      data: { profession: "Beat Boxer" },
      errors: [],
    }),
  )
})

test("validates onBlur behavior for radio control", async () => {
  const updateData = vi.fn()
  render({
    schema: enumPSISchema,
    uischema: enumPSIUISchema,
    onChange: (result) => {
      updateData(result)
    },
  })

  const radioLabel = screen.getByText("1000")
  await userEvent.click(radioLabel)
  await userEvent.tab()

  await waitFor(() =>
    expect(updateData).toHaveBeenLastCalledWith({
      data: { psi: 1000 },
      errors: [],
    }),
  )

  // Verify the corresponding radio input is checked
  const radioButtons = screen.getAllByRole("radio")
  expect(radioButtons[1]).toBeChecked()
})

test("validates onBlur behavior for segmented control", async () => {
  const updateData = vi.fn()
  render({
    schema: enumSizeSchema,
    uischema: enumSizeUISchema,
    onChange: (result) => {
      updateData(result)
    },
  })

  const segmentedOption = screen.getByTitle("XL")
  await userEvent.click(segmentedOption)
  await userEvent.tab() // Blur the segmented control

  await waitFor(() =>
    expect(updateData).toHaveBeenLastCalledWith({
      data: { size: "XL" },
      errors: [],
    }),
  )
})

test("validates form state with default values", async () => {
  const updateData = vi.fn()
  render({
    schema: enumSizeSchema,
    uischema: enumSizeUISchema,
    onChange: (result) => {
      updateData(result)
    },
  })

  await waitFor(() => {
    const radioInputs = screen.getAllByRole("radio")
    expect(radioInputs[2]).toBeChecked()
  })
})

test("validates case insensitive search in dropdown", async () => {
  const updateData = vi.fn()
  render({
    schema: enumProfessionSchema,
    uischema: enumProfessionUISchema,
    onChange: (result) => {
      updateData(result)
    },
  })

  const combobox = screen.getByRole("combobox")

  await userEvent.click(combobox)
  await userEvent.type(combobox, "FOOT")

  await userEvent.click(screen.getByTitle("Footballer"))

  await waitFor(() =>
    expect(updateData).toHaveBeenLastCalledWith({
      data: { profession: "Footballer" },
      errors: [],
    }),
  )
})
