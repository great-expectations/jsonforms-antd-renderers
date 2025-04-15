import { test, expect, describe } from "vitest"
import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { render, strictRender } from "../common/test-render"

import {
  arrayControlUISchema,
  objectArrayControlJsonSchema,
  arrayControlUISchemaWithIcons,
  objectArrayControlJsonSchemaWithRequired,
  objectArrayWithCombinatorSchema,
  objectArrayWithCombinator_CombinatorUISchemaRegistryEntry as objectArrayWithCombinator_CombinatorPropertyUISchemaRegistryEntry,
  objectArrayWithCombinator_FavoriteThing1UISchemaRegistryEntry as objectArrayWithCombinator_CombinatorSubschemaUISchemaRegistryEntry,
} from "../testSchemas/arraySchema"
import { UISchema } from "../ui-schema"
import { JSONFormData } from "../common/schema-derived-types"

describe("ObjectArrayControl", () => {
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
      screen.getByDisplayValue("my asset")
      screen.getByDisplayValue("my other asset")
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
    let data: JSONFormData<typeof objectArrayControlJsonSchema> = { assets: [] }
    const user = userEvent.setup()
    render({
      schema: objectArrayControlJsonSchema,
      uischema: arrayControlUISchema,
      data,
      onChange: (result) => {
        data = result.data as JSONFormData<typeof objectArrayControlJsonSchema>
      },
    })

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
    let data: JSONFormData<typeof objectArrayControlJsonSchema> = {
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
        data = result.data as JSONFormData<typeof objectArrayControlJsonSchema>
      },
    })
    await screen.findByDisplayValue("my asset")
    screen.getByDisplayValue("remove me!")
    screen.getByDisplayValue("my other asset")
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
    const updatedRemoveButtons = screen.getAllByRole("button", {
      name: "Delete",
    })
    expect(updatedRemoveButtons).toHaveLength(2)
    screen.getByDisplayValue("my asset")
    screen.getByDisplayValue("my other asset")
  })

  test("renders with overwritten icons and does not allow overwriting onClick", async () => {
    const user = userEvent.setup()
    let data: JSONFormData<typeof objectArrayControlJsonSchema> = {
      assets: [{ asset: "one" }],
    }
    render({
      schema: objectArrayControlJsonSchema,
      uischema: arrayControlUISchemaWithIcons,
      data,
      onChange: (result) => {
        data = result.data as JSONFormData<typeof objectArrayControlJsonSchema>
      },
    })
    // Add button text is overwritten and has the correct icon
    screen.getByText("Add more items")
    screen.getByLabelText("plus-circle") // fyi: aria-label is "plus-circle"

    // Delete button text is overwritten and has the correct icon
    const deleteButton = await screen.findByText("Destroy me!")
    await screen.findByLabelText("delete") // fyi: aria-label is "delete"

    // Check that the empty onClick handler is not overwritten on Delete button
    await user.click(deleteButton)
    await waitFor(() => {
      expect(data.assets?.length).toEqual(1)
    })
  })

  test("Object Array populates 1 empty value without minItems", async () => {
    render({
      schema: objectArrayControlJsonSchema,
      uischema: arrayControlUISchemaWithIcons,
    })

    await screen.findByText("Asset")
  })
  test("Object Array lets you delete the last item in the array", async () => {
    render({
      schema: objectArrayControlJsonSchema,
      uischema: arrayControlUISchemaWithIcons,
    })

    await screen.findByText("Asset")
    await userEvent.click(screen.getByText("Destroy me!"))
    await screen.findAllByText("No data")
  })
  test("Object Array ensures one default item exists in the list if subschema is a combinator", async () => {
    strictRender({
      schema: objectArrayWithCombinatorSchema,
      uischema: {
        type: "VerticalLayout",
        elements: [{ scope: "#/properties/list", type: "Control" }],
      } satisfies UISchema<typeof objectArrayWithCombinatorSchema>,
      uiSchemaRegistryEntries: [
        objectArrayWithCombinator_CombinatorPropertyUISchemaRegistryEntry,
        objectArrayWithCombinator_CombinatorSubschemaUISchemaRegistryEntry,
      ],
    })

    await screen.findByText("Brown Copper Kettle")
  })
})
