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

test("renders the enum component as radio", () => {
  render({
    schema: enumPSISchema,
    uischema: enumPSIUISchema,
  })

  const radioButtons = screen.getAllByRole("radio")
  expect(radioButtons).toHaveLength(3)
})

test("renders the enum component as dropdown", () => {
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
