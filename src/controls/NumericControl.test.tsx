import { JSONSchema } from "json-schema-to-ts"
import { describe, expect, test, it } from "vitest"
import { screen, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { render } from "../common/test-render"
import {
  numericMagnitudeSchema,
  numericTheNumberSchema,
  numericWeightSchema,
  numericSheepSchema,
  numericBeansSchema,
  numericVerticalUISchema,
  numericUISchemaWithRule,
  numericPriceSchema,
  numericUSDUISchema,
  numericLeadingZerosSchema,
} from "../testSchemas/numericSchema"
import { JSONFormData } from "../common/schema-derived-types"

describe("NumericControl", () => {
  it("does not fall back to default if value is provided", () => {
    const data: JSONFormData<typeof numericTheNumberSchema> = {
      numericValue: 0.999,
    }

    render({
      schema: numericTheNumberSchema,
      data,
    })

    expect(screen.getByRole("spinbutton")).toHaveValue("0.999")
  })

  it("calls onChange with number values", async () => {
    let data: JSONFormData<typeof numericTheNumberSchema> = {
      numericValue: 42.0,
    }
    render({
      schema: numericTheNumberSchema,
      data,
      onChange: (state) => {
        data = state.data as JSONFormData<typeof numericTheNumberSchema>
      },
    })

    await userEvent.clear(screen.getByRole("spinbutton"))
    await userEvent.type(screen.getByRole("spinbutton"), "42.00")

    await waitFor(() => {
      expect(data).toEqual({
        numericValue: 42.0,
      })
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

  it.each([[0], [100]])(
    "renders when data of %s is included",
    (dataVal: number) => {
      const data = { numericValue: dataVal }
      render({
        data: data,
        schema: numericTheNumberSchema, // this has a default of 42.42
        uischema: numericVerticalUISchema,
      })
      screen.getByText("The Number")
      expect(screen.getByRole("spinbutton")).toHaveValue(`${dataVal}`)
    },
  )

  it("renders default value when no data is provided", () => {
    render({
      schema: numericTheNumberSchema,
      uischema: numericVerticalUISchema,
    })
    expect(screen.getByRole("spinbutton")).toHaveValue("42.42")
  })

  it("changes its value when users type", async () => {
    let data: JSONSchema
    render({
      schema: numericMagnitudeSchema,
      uischema: numericVerticalUISchema,
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

  it("shows error message onBlur when field is required and empty", async () => {
    render({
      schema: numericTheNumberSchema,
      uischema: numericVerticalUISchema,
    })
    const input = screen.getByRole("spinbutton")
    await userEvent.clear(input)
    await userEvent.tab()
    await screen.findByText("The Number is required")
  })

  it("shows units next to text input if set in UI schema", async () => {
    render({
      schema: numericPriceSchema,
      uischema: numericUSDUISchema,
    })
    await screen.findByText("$")
  })

  it.each([numericSheepSchema, numericBeansSchema])(
    "is treated as an integer if the schema type is integer or the type is an array with only integer",
    async (schema: JSONSchema) => {
      render({
        schema: schema,
        uischema: numericVerticalUISchema,
      })
      const input = screen.getByRole("spinbutton")
      await userEvent.type(input, "123.45") // try to input a float
      await userEvent.tab()
      expect(input).toHaveValue("123") // it should be rounded to an integer
    },
  )

  it("preserves leading zeros on valid numerical inputs", async () => {
    render({
      schema: numericLeadingZerosSchema,
    })

    const input = screen.getByRole("spinbutton")
    expect(input).toHaveValue("3000")

    await userEvent.click(input)
    await userEvent.keyboard(
      "[ArrowLeft][ArrowLeft][ArrowLeft][ArrowLeft][Delete]",
    )
    expect(input).toHaveValue("000")

    await userEvent.keyboard("5")
    expect(input).toHaveValue("5000")

    await userEvent.keyboard("[ArrowRight][ArrowRight]a")
    expect(input).toHaveValue("")
  })
})
