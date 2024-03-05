import { describe, expect, it } from "vitest"
import { screen, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { render } from "../common/test-render"
import { numberTheNumberSchema, numberWeightSchema } from "../testSchemas/numberSchema"

describe("NumericControl", () => {
  it("falls back to default value if value is undefined", () => {
    render({
      schema: { ...numberTheNumberSchema },
      data: undefined,
    })

    expect(screen.getByRole("spinbutton")).toHaveValue("42.42")
  })

  it("does not fall back to default if value is null", () => {
    render({
      schema: { ...numberTheNumberSchema },
      data: null,
    })

    expect(screen.getByRole("spinbutton")).toHaveValue("")
  })

  it("calls onChange with number values", async () => {
    let data: number | null = 123
    render({
      schema: numberTheNumberSchema,
      data,
      onChange: (state) => {
        data = state.data
      },
    })

    await userEvent.clear(screen.getByRole("spinbutton"))
    await userEvent.type(screen.getByRole("spinbutton"), "345")

    await waitFor(() => {
      expect(data).toBe(345)
    })
  })

  it("calls onChange with null and no errors when the input gets cleared out and optional", async () => {
    let state: Record<string, unknown> = {}
    render({
      schema: numberWeightSchema,
      data: 123,
      onChange: (newState) => {
        state = newState
      },
    })

    await userEvent.clear(screen.getByRole("spinbutton"))

    await waitFor(() => {
      expect(state.data).toBe(null)
      expect(state.errors).toHaveLength(0)
    })
  })
})