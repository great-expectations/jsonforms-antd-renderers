import { test, expect, describe } from "vitest"
import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { render } from "../common/test-render"

import {
  arrayControlUISchema,
  objectArrayControlJsonSchema,
  arrayControlUISchemaWithIcons,
  objectArrayControlJsonSchemaWithRequired,
  stringArrayControlJsonSchema,
  stringArrayControlJsonSchemaWithRequired,
  stringArrayControlJsonSchemaWithTitle,
  numberArrayControlJsonSchema,
} from "../testSchemas/arraySchema"

describe("ArrayControl for Objects", () => {
  test("renders without any data", async () => {
    render({
      schema: objectArrayControlJsonSchema,
      uischema: arrayControlUISchema,
    })
    await screen.findByRole("button")
    await screen.findByText("Add Assets")
    await screen.findByText("No data")
  })

  test.each([
    [objectArrayControlJsonSchema, false],
    [objectArrayControlJsonSchemaWithRequired, true],
  ])(
    "renders disabled remove button with one element if required",
    async (schema, should_be_disabled) => {
      render({
        schema: schema,
        uischema: arrayControlUISchema,
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
    "renders enabled remove buttons with multiple elements",
    async (schema) => {
      render({
        schema: schema,
        uischema: arrayControlUISchema,
        data: { assets: [{ asset: "my asset" }, { asset: "my other asset" }] },
      })
      await screen.findByText("Add Assets")
      await screen.findByDisplayValue("my asset")
      await screen.findByDisplayValue("my other asset")
      //note: the text is within a span in the <button>
      const removeButtons = await screen.findAllByRole("button", {
        name: "Delete",
      })
      expect(removeButtons).toHaveLength(2)
      removeButtons.forEach((removeButton) => {
        expect(removeButton).toHaveProperty("disabled", false)
      })
    },
  )

  test("correctly appends to the list with add button", async () => {
    let data = { assets: [] }
    const user = userEvent.setup()
    render({
      schema: objectArrayControlJsonSchema,
      uischema: arrayControlUISchema,
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

  test("correctly removes from the list with remove button", async () => {
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
      uischema: arrayControlUISchema,
      data: data,
      onChange: (result) => {
        data = result.data
      },
    })
    await screen.findByDisplayValue("my asset")
    await screen.findByDisplayValue("remove me!")
    await screen.findByDisplayValue("my other asset")
    const removeButtons = await screen.findAllByRole("button", {
      name: "Delete",
    })
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

  test("renders with overwritten icons and does not allow overwriting onClick", async () => {
    const user = userEvent.setup()
    let data = { assets: [] }
    render({
      schema: objectArrayControlJsonSchema,
      uischema: arrayControlUISchemaWithIcons,
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
    await screen.findByRole("textbox")
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
})

describe("ArrayControl for Primatives", () => {
  test("renders without any data", async () => {
    render({
      schema: stringArrayControlJsonSchema,
      uischema: arrayControlUISchema,
    })
    await screen.findByRole("button")
    await screen.findByText("Add Assets")
    await screen.findByText("No data")
  })

  test.each([
    [stringArrayControlJsonSchema, false],
    [stringArrayControlJsonSchemaWithRequired, true],
  ])(
    "renders disabled remove button with one element if required",
    async (schema, should_be_disabled) => {
      render({
        schema: schema,
        uischema: arrayControlUISchema,
        data: { assets: ["my asset"] },
      })
      await screen.findByText("Add Assets")
      await screen.findByDisplayValue("my asset")
      //note: the text is within a span in the <button>
      const removeButton = await screen.findByRole("button", { name: "Delete" })
      expect(removeButton).toHaveProperty("disabled", should_be_disabled)
    },
  )

  test.each([
    [stringArrayControlJsonSchema],
    [stringArrayControlJsonSchemaWithRequired],
  ])(
    "renders enabled remove buttons with multiple elements",
    async (schema) => {
      render({
        schema: schema,
        uischema: arrayControlUISchema,
        data: { assets: ["my asset", "my other asset"] },
      })
      await screen.findByRole("button", { name: "Add Assets" })
      await screen.findByDisplayValue("my asset")
      await screen.findByDisplayValue("my other asset")
      //note: the text is within a span in the <button>
      const removeButtons = await screen.findAllByRole("button", {
        name: "Delete",
      })
      expect(removeButtons).toHaveLength(2)
      removeButtons.forEach((removeButton) => {
        expect(removeButton).toHaveProperty("disabled", false)
      })
    },
  )

  test("correctly appends to the list with add button", async () => {
    let data = { assets: [] }
    const user = userEvent.setup()
    render({
      schema: stringArrayControlJsonSchema,
      uischema: arrayControlUISchema,
      data: data,
      onChange: (result) => {
        data = result.data
      },
    })
    await user.click(screen.getByRole("button", { name: "Add Assets" }))
    const newAsset = await screen.findByRole("textbox")
    await user.type(newAsset, "new")
    await screen.findByDisplayValue("new")
    await waitFor(() => {
      expect(data).toEqual({
        assets: ["new"],
      })
    })
  })

  test("correctly removes from the list with remove button", async () => {
    let data = {
      assets: ["my asset", "remove me!", "my other asset"],
    }
    const user = userEvent.setup()
    render({
      schema: stringArrayControlJsonSchema,
      uischema: arrayControlUISchema,
      data: data,
      onChange: (result) => {
        data = result.data
      },
    })
    await screen.findByDisplayValue("my asset")
    await screen.findByDisplayValue("remove me!")
    await screen.findByDisplayValue("my other asset")
    const removeButtons = await screen.findAllByRole("button", {
      name: "Delete",
    })
    expect(removeButtons).toHaveLength(3)
    await user.click(removeButtons[1])
    await waitFor(() => {
      expect(data).toEqual({
        assets: ["my asset", "my other asset"],
      })
    })
    const updatedRemoveButtons = await screen.findAllByRole("button", {
      name: "Delete",
    })
    expect(updatedRemoveButtons).toHaveLength(2)
    await screen.findByDisplayValue("my asset")
    await screen.findByDisplayValue("my other asset")
  })

  test("renders with overwritten icons and does not allow overwriting onClick", async () => {
    const user = userEvent.setup()
    let data = { assets: [] }
    render({
      schema: stringArrayControlJsonSchema,
      uischema: arrayControlUISchemaWithIcons,
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
    await screen.findByRole("textbox")
    await waitFor(() => {
      expect(data).toEqual({
        assets: [""],
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

  test("renders with title", async () => {
    const data = { assets: ["apple"] }
    render({
      schema: stringArrayControlJsonSchemaWithTitle,
      uischema: arrayControlUISchema,
      data: data,
    })
    // Title is used within the Add button
    await screen.findByText("Add Use this as the label")

    // Delete button text is overwritten and has the correct icon
    await screen.findByText("Delete")

    // Label is used within the input
    const textbox = await screen.findByLabelText("Use this as the label")
    expect(textbox).toHaveProperty("value", "apple")
  })

  test("Primitive Number Array should not error if item is null", async () => {
    const user = userEvent.setup()
    const data = { assets: [0] }
    render({
      schema: numberArrayControlJsonSchema,
      uischema: arrayControlUISchema,
      data: data,
    })

    await screen.findByDisplayValue("0")
    // Antd List component does not like null or undefined values, and will error if they are present
    // This test is to ensure that the component does not error if the value is null
    await user.clear(screen.getByDisplayValue("0"))
  })
})
