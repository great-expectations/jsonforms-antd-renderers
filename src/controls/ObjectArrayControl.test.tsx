import { test, expect } from "vitest"
import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { render } from "../common/test-render"

import {
  objectArrayControlUISchema,
  objectArrayControlJsonSchema,
  objectArrayControlUISchemaWithIcons,
  objectArrayControlJsonSchemaWithRequired,
} from "../testSchemas/objectArraySchema"

test("ObjectArrayControl renders without any data", async () => {
  render({
    schema: objectArrayControlJsonSchema,
    uischema: objectArrayControlUISchema,
  })
  await screen.findByRole("button")
  await screen.findByText("Add Assets")
  await screen.findByText("No data")
})

test.each([
  [objectArrayControlJsonSchema, false],
  [objectArrayControlJsonSchemaWithRequired, true],
])(
  "ObjectArrayControl renders disabled remove button with one element if required",
  async (schema, should_be_disabled) => {
    render({
      schema: schema,
      uischema: objectArrayControlUISchema,
      data: { assets: [{ asset: "my asset" }] },
    })
    await screen.findByText("Add Assets")
    await screen.findByDisplayValue("my asset")
    //note: the text is within a span in the <button>
    const removeButton = await screen.findByRole("button", { name: "Delete" })
    expect(removeButton).toHaveProperty("disabled", should_be_disabled)
  },
)

test.each([
  [objectArrayControlJsonSchema],
  [objectArrayControlJsonSchemaWithRequired],
])(
  "ObjectArrayControl renders enabled remove buttons with multiple elements",
  async (schema) => {
    render({
      schema: schema,
      uischema: objectArrayControlUISchema,
      data: { assets: [{ asset: "my asset" }, { asset: "my other asset" }] },
    })
    await screen.findByText("Add Assets")
    await screen.findByDisplayValue("my asset")
    await screen.findByDisplayValue("my other asset")
    const removeButtons = await screen.findAllByRole("button", {
      name: "Delete",
    })
    expect(removeButtons).toHaveLength(2)
    removeButtons.forEach((removeButton) => {
      expect(removeButton).toHaveProperty("disabled", false)
    })
  },
)

test("ObjectArrayControl correctly appends to the list with add button", async () => {
  let data = { assets: [] }
  const user = userEvent.setup()
  render({
    schema: objectArrayControlJsonSchema,
    uischema: objectArrayControlUISchema,
    data: data,
    onChange: (result) => {
      data = result.data
    },
  })
  await user.click(screen.getByRole("button", { name: "Add Assets" }))
  const newAsset = await screen.findByLabelText("Asset")
  await user.type(newAsset, "new")
  await screen.findByDisplayValue("new")
  await waitFor(() => {
    expect(data).toEqual({
      assets: [{ asset: "new" }],
    })
  })
})

test("ObjectArrayControl correctly removes from the list with remove button", async () => {
  let data = {
    assets: [
      { asset: "my asset" },
      { asset: "remove me!" },
      { asset: "my other asset" },
    ],
  }
  const user = userEvent.setup()
  render({
    schema: objectArrayControlJsonSchema,
    uischema: objectArrayControlUISchema,
    data: data,
    onChange: (result) => {
      data = result.data
    },
  })
  await screen.findByDisplayValue("my asset")
  await screen.findByDisplayValue("remove me!")
  await screen.findByDisplayValue("my other asset")
  const removeButtons = await screen.findAllByRole("button", { name: "Delete" })
  expect(removeButtons).toHaveLength(3)
  await user.click(removeButtons[1])
  await waitFor(() => {
    expect(data).toEqual({
      assets: [{ asset: "my asset" }, { asset: "my other asset" }],
    })
  })
  const updatedRemoveButtons = await screen.findAllByRole("button", {
    name: "Delete",
  })
  expect(updatedRemoveButtons).toHaveLength(2)
  await screen.findByDisplayValue("my asset")
  await screen.findByDisplayValue("my other asset")
})

test("ObjectArrayControl renders with overwritten icons and does not allow overwriting onClick", async () => {
  const user = userEvent.setup()
  let data = { assets: [] }
  render({
    schema: objectArrayControlJsonSchema,
    uischema: objectArrayControlUISchemaWithIcons,
    data: data,
    onChange: (result) => {
      data = result.data
    },
  })
  // Add button text is overwritten and has the correct icon
  await screen.findByText("Add more items")
  await screen.findByLabelText("plus-circle") // fyi: aria-label is "plus-circle"

  // Check that the onClick handler is not overwritten on Add button
  await user.click(await screen.findByText("Add more items"))
  await screen.findByDisplayValue("")
  await waitFor(() => {
    expect(data).toEqual({
      assets: [{}],
    })
  })

  // Delete button text is overwritten and has the correct icon
  await screen.findByText("Destroy me!")
  await screen.findByLabelText("delete") // fyi: aria-label is "delete"

  // Check that the onClick handler is not overwritten on Delete button
  const deleteButton = await screen.findByText("Destroy me!")
  await user.click(deleteButton)
  await waitFor(() => {
    expect(data).toEqual({
      assets: [],
    })
  })
})
