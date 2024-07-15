import { test, expect, describe } from "vitest"
import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { render } from "../common/test-render"

import {
  arrayControlUISchema,
  stringArrayControlJsonSchema,
  stringArrayControlJsonSchemaWithRequired,
  stringArrayControlJsonSchemaWithTitle,
  numberArrayControlJsonSchema,
  arrayInsideCombinatorSchema,
  arrayControlSortableUISchema,
} from "../testSchemas/arraySchema"
import { UISchema } from "../ui-schema"
import { JSONFormData } from "../common/schema-derived-types"

describe("PrimitiveArrayControl", () => {
  test("renders without any data", async () => {
    render({
      schema: stringArrayControlJsonSchema,
      uischema: arrayControlUISchema,
    })
    await screen.findByPlaceholderText("value")
    screen.getByRole("button", { name: "Add Assets" })
  })

  test.each([
    [stringArrayControlJsonSchema],
    [stringArrayControlJsonSchemaWithRequired],
  ])(
    "does not render remove, up, or down buttons with only one element",
    async (schema) => {
      render({
        schema: schema,
        uischema: arrayControlSortableUISchema,
        data: { assets: ["my asset"] },
      })
      await screen.findByText("Add Assets")
      screen.getByDisplayValue("my asset")
      //note: the text is within a span in the <button>
      expect(screen.queryByRole("button", { name: "Delete" })).toBeNull()
      expect(screen.queryByLabelText(/move up/i)).toBeNull()
      expect(screen.queryByLabelText(/move down/i)).toBeNull()
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
      })
      const addButton = await screen.findByRole("button", {
        name: "Add Assets",
      })
      await userEvent.click(addButton)
      //note: the text is within a span in the <button>
      const removeButtons = screen.getAllByRole("button", {
        name: "Delete",
      })
      expect(removeButtons).toHaveLength(2)
      removeButtons.forEach((removeButton) => {
        expect(removeButton).toHaveProperty("disabled", false)
      })
    },
  )

  test("correctly appends to the list with add button", async () => {
    let data: JSONFormData<typeof stringArrayControlJsonSchema> = {}
    const user = userEvent.setup()
    render({
      schema: stringArrayControlJsonSchema,
      uischema: arrayControlUISchema,
      data: data,
      onChange: (result) => {
        data = result.data as JSONFormData<typeof stringArrayControlJsonSchema>
      },
    })
    const newAsset = await screen.findByPlaceholderText("value")
    await user.type(newAsset, "new")
    screen.getByDisplayValue("new")
    await waitFor(() => {
      expect(data).toEqual({
        assets: ["new"],
      })
    })
  })

  test("correctly removes from the list with remove button", async () => {
    const user = userEvent.setup()
    render({
      schema: stringArrayControlJsonSchema,
      uischema: arrayControlUISchema,
    })
    const addButton = await screen.findByRole("button", { name: "Add Assets" })
    await user.click(addButton)
    await user.click(addButton)
    const inputFields = await screen.findAllByPlaceholderText("value")
    await user.type(inputFields[0], "my asset")
    await user.type(inputFields[1], "remove me!")
    await user.type(inputFields[2], "my other asset")
    const removeButtons = await screen.findAllByRole("button", {
      name: "Delete",
    })
    expect(removeButtons).toHaveLength(3)
    await user.click(removeButtons[1])
    const updatedRemoveButtons = await screen.findAllByRole("button", {
      name: "Delete",
    })
    expect(updatedRemoveButtons).toHaveLength(2)
    screen.getByDisplayValue("my asset")
    screen.getByDisplayValue("my other asset")
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
  test("Array of string inputs should have aria labels", async () => {
    const data = { assets: ["abc", "def"] }
    render({
      schema: stringArrayControlJsonSchema,
      uischema: arrayControlUISchema,
      data: data,
    })

    await screen.findByLabelText("Assets 1")
  })
  test("Array of number inputs should have aria labels", async () => {
    const data = { assets: [11, 5] }
    render({
      schema: numberArrayControlJsonSchema,
      uischema: arrayControlUISchema,
      data: data,
    })

    await screen.findByLabelText("Assets 1")
  })
  test("Aria label falls back to the label from props (this bug is only reproducible when Primitive Array is rendered from a Combinator subschema)", async () => {
    const data = { assets: [11, 5] }
    render({
      schema: arrayInsideCombinatorSchema,
      uischema: {
        type: "VerticalLayout",
        elements: [{ type: "Control", scope: "#/properties/list" }],
      } satisfies UISchema<typeof arrayInsideCombinatorSchema>,
      data: data,
    })

    await screen.findByLabelText("Text 1")
  })
  test("Array should show all data without clicking add", async () => {
    const data = { assets: [11, 5, 18, 22] }
    render({
      schema: numberArrayControlJsonSchema,
      uischema: arrayControlUISchema,
      data: data,
    })

    await screen.findByLabelText("Assets 1")
    await screen.findByLabelText("Assets 2")
    await screen.findByLabelText("Assets 3")
    await screen.findByLabelText("Assets 4")
  })
  test("Arrays are sortable", async () => {
    let data: JSONFormData<typeof stringArrayControlJsonSchema> = {
      assets: ["A", "B", "C", "D"],
    }
    const user = userEvent.setup()
    render({
      schema: stringArrayControlJsonSchema,
      uischema: arrayControlSortableUISchema,
      data: data,
      onChange: (result) => {
        data = result.data as JSONFormData<typeof stringArrayControlJsonSchema>
      },
    })

    const moveUpButtons = await screen.findAllByLabelText(/move up/i)
    const moveDownButtons = await screen.findAllByLabelText(/move down/i)
    expect(moveUpButtons).toHaveLength(4)
    expect(moveDownButtons).toHaveLength(4)
    expect(moveUpButtons[0]).toHaveProperty("disabled", true)
    expect(moveDownButtons[3]).toHaveProperty("disabled", true)
    await user.click(moveUpButtons[3])
    await waitFor(() => {
      expect(data).toEqual({ assets: ["A", "B", "D", "C"] })
    })
    await user.click(moveDownButtons[0])
    await waitFor(() => {
      expect(data).toEqual({ assets: ["B", "A", "D", "C"] })
    })
  })
})
