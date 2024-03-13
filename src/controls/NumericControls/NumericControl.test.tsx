import { JSONSchema } from "json-schema-to-ts"
import { describe, expect, test, it } from "vitest"
import { screen, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { render } from "../../common/test-render"
import {
  numericMagnitudeSchema,
  numericTheNumberSchema,
  numericWeightSchema,
  numericUISchema,
  numericUISchemaWithRule,
  numericPriceSchema,
  numericUSDUISchema,
} from "../../testSchemas/numericSchema/numericSchema"


describe("NumericControl", () => {
  it("does not fall back to default if value is empty", () => {
    render({
      schema: numericTheNumberSchema,
      data: {},
    })

    expect(screen.getByRole("spinbutton")).toHaveValue("")
  })

  it("calls onChange with number values", async () => {
    let data = { numericValue: 42.00 }
    render({
      schema: numericTheNumberSchema,
      data,
      onChange: (state) => {
        data = state.data
      },
    })

    await userEvent.clear(screen.getByRole("spinbutton"))
    await userEvent.type(screen.getByRole("spinbutton"), "42.00")

    await waitFor(() => {
      expect(data).toBe(42.00)
    })
  })

  it("calls onChange with empty object and no errors when the input gets cleared out and optional", async () => {
    const weight = {}
    let state: Record<string, unknown> = {}
    render({
      schema: numericWeightSchema,
      data: weight,
      onChange: (newState) => {
        state = newState
      },
    })

    await userEvent.clear(screen.getByRole("spinbutton"))

    await waitFor(() => {
      expect(state.data).toBe(weight)
    })

    await waitFor(() => {
      expect(state.errors).toHaveLength(0)
    })
  })

  test("renders a number input with no UISchema provided", () => {
    render({
      schema: numericMagnitudeSchema,
    })

    screen.getByText("Magnitude")
  })

  it("Follows the hide rule", () => {
    const data = { numericValue: 1000 }
    render({
      data: data,
      schema: numericMagnitudeSchema,
      uischema: numericUISchemaWithRule,
    })
    expect(screen.queryByText("Magnitude")).toBeNull()
  })

  it.each([[0], [100]])("renders when data of %s is included", (dataVal: number) => {
    const data = { numericValue: dataVal}
    render({
      data: data,
      schema: numericTheNumberSchema, // this has a default of 42.42
      uischema: numericUISchema,
    })
    screen.getByText("The Number")
    expect(screen.getByRole("spinbutton")).toHaveValue(`${dataVal}`)
  })

  it.each([[numericTheNumberSchema]])("renders default value when no data is provided", (schema: JSONSchema) => {
    render({
      schema: schema,
      uischema: numericUISchema,
    })
    expect(screen.getByRole("spinbutton")).toHaveValue("42.42")
  })

  it("changes its value when users type", async () => {
    let data: JSONSchema
    render({
      schema: numericMagnitudeSchema,
      uischema: numericUISchema,
      onChange: (state: { data: JSONSchema }) => {
        data = state.data
      },
    })

    await userEvent.clear(screen.getByRole("spinbutton"))
    await userEvent.type(screen.getByRole("spinbutton"), "123")

    await waitFor(() => {
      expect(data).toEqual({ numericValue: 123 })
    })
  })

  it ("shows error message onBlur when field is required and empty", async () => {
    render({
      schema: numericTheNumberSchema,
      uischema: numericUISchema,
    })
    const input = screen.getByRole("spinbutton")
    await userEvent.clear(input)
    await userEvent.tab()
    await screen.findByText("The Number is required")
  })

  it ("shows units next to text input if set in UI schema", async () => {
    render({
      schema: numericPriceSchema,
      uischema: numericUSDUISchema,
    })
    await screen.findByText("$")
  })
})
