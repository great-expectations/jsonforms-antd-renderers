import { describe, expect, it } from "vitest"
import { screen, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { render } from "../common/test-render"
import { numberTheNumberSchema, numberWeightSchema } from "../testSchemas/numberSchema"

describe("NumericControl", () => {
  it("does not fall back to default if value is empty", () => {
    render({
      schema: { ...numberTheNumberSchema },
      data: {},
    })

    expect(screen.getByRole("spinbutton")).toHaveValue("")
  })

  it("calls onChange with number values", async () => {
    let data = { theNumber: 42.00 }
    render({
      schema: numberTheNumberSchema,
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
      schema: numberWeightSchema,
      data: weight,
      onChange: (newState) => {
        state = newState
      },
    })

    await userEvent.clear(screen.getByRole("spinbutton"))

    await waitFor(() => {
      expect(state.data).toBe(weight)
      const errors = state.errors
      console.log({errors})
      expect(state.errors).toHaveLength(0)
    })
  })
})