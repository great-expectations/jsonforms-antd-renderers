import { test } from "vitest"
import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { render } from "../common/test-render"

import {
  objectArrayControlUISchema,
  objectArrayControlJsonSchema,
  objectArrayControlUISchemaWithIcons,
} from "../testSchemas/objectArraySchema"
import { expect } from "@storybook/test"

test("ObjectArrayControl renders without any data", async () => {
  render({
    schema: objectArrayControlJsonSchema,
    uischema: objectArrayControlUISchema,
  })
  await screen.findByRole("button")
  await screen.findByText("Add Assets")
  await screen.findByText("No data")
})

test("ObjectArrayControl renders disabled remove button with one element", async () => {
  render({
    schema: objectArrayControlJsonSchema,
    uischema: objectArrayControlUISchema,
    data: { assets: [{ asset: "my asset" }] },
  })
  await screen.findByText("Add Assets")
  await screen.findByDisplayValue("my asset")
  //note: the text is within a span in the <button>
  const removeButton = (await screen.findByText("Delete")).parentNode
  expect(removeButton).toHaveProperty("disabled", true)
})

test("ObjectArrayControl renders enabled remove buttons with multiple elements", async () => {
  render({
    schema: objectArrayControlJsonSchema,
    uischema: objectArrayControlUISchema,
    data: { assets: [{ asset: "my asset" }, { asset: "my other asset" }] },
  })
  await screen.findByText("Add Assets")
  await screen.findByDisplayValue("my asset")
  await screen.findByDisplayValue("my other asset")
  //note: the text is within a span in the <button>
  const removeButton = (await screen.findAllByText("Delete"))[0].parentNode
  expect(removeButton).toHaveProperty("disabled", false)
})

test("ObjectArrayControl correctly appends to the list with add button", async () => {
  let data = { assets: [{ asset: "my asset" }] }
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
  await user.click(screen.getByRole("button", { name: "Add Assets" }))
  const newAsset = await screen.findByDisplayValue("")
  await user.type(newAsset, "my other asset")
  await screen.findByDisplayValue("my other asset")
  await waitFor(() => {
    expect(data).toEqual({
      assets: [{ asset: "my asset" }, { asset: "my other asset" }],
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
})

test("ObjectArrayControl renders with overwritten icons and does not allow overwriting onClick", async () => {
  const user = userEvent.setup()
  let data = { assets: [{ asset: "my asset" }, { asset: "my other asset" }] }
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
  // Delete button text is overwritten and has the correct icon
  expect(await screen.findAllByText("Destroy me!")).toHaveLength(2)
  expect(await screen.findAllByLabelText("delete")).toHaveLength(2) // fyi: aria-label is "delete"

  // Check that the onClick handler is not overwritten on Add button
  user.click(await screen.findByText("Add more items"))
  await screen.findByDisplayValue("")
  await waitFor(() => {
    expect(data).toEqual({
      assets: [{ asset: "my asset" }, { asset: "my other asset" }, {}],
    })
  })

  // Check that the onClick handler is not overwritten on Delete button
  const deleteButtons = await screen.findAllByText("Destroy me!")
  expect(deleteButtons).toHaveLength(3)
  user.click(deleteButtons[0])
  await waitFor(() => {
    expect(data).toEqual({
      assets: [{ asset: "my other asset" }, {}],
    })
  })
})
