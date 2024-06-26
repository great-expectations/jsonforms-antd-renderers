import { describe, expect, test, it } from "vitest"
import { screen, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { render } from "../common/test-render"
import { JSONSchema } from "json-schema-to-ts"
import {
  numericSliderBasisPointsSchema,
  numericSliderVerticalUISchema,
  numericSliderFinalGradeSchema,
  numericSliderPercentageUISchema,
  numericSliderUISchemaWithRule,
} from "../testSchemas/numericSliderSchema"
import { JSONFormData } from "../common/schema-derived-types"

describe("NumericSliderControl", () => {
  test("renders a slider and number input with no UISchema provided", () => {
    render({
      schema: numericSliderBasisPointsSchema,
    })

    screen.getByRole("slider")
    screen.getByText("Basis Points")
  })

  it("Follows the hide rule", () => {
    const data = { numericRangeValue: 1000 }
    render({
      data: data,
      schema: numericSliderBasisPointsSchema,
      uischema: numericSliderUISchemaWithRule,
    })
    expect(screen.queryByText("Basis Points")).toBeNull()
  })

  it("renders default value when no data is provided", () => {
    render({
      schema: numericSliderFinalGradeSchema,
      uischema: numericSliderVerticalUISchema,
    })
    expect(screen.getByRole("spinbutton")).toHaveValue("0.5")
  })

  it("changes its value when users type", async () => {
    let data: JSONSchema
    render({
      schema: numericSliderBasisPointsSchema,
      uischema: numericSliderVerticalUISchema,
      onChange: (state: { data: JSONSchema }) => {
        data = state.data
      },
    })

    await userEvent.clear(screen.getByRole("spinbutton"))
    await userEvent.type(screen.getByRole("spinbutton"), "123")

    await waitFor(() => {
      expect(data).toEqual({ numericRangeValue: 123 })
    })
  })

  it("does not fall back to default if value is empty", () => {
    render({
      schema: numericSliderBasisPointsSchema,
      data: {},
    })

    expect(screen.getByRole("spinbutton")).toHaveValue("")
  })

  it("calls onChange with number values", async () => {
    let data: JSONFormData<typeof numericSliderBasisPointsSchema> = {
      numericRangeValue: 42.0,
    }
    render({
      schema: numericSliderBasisPointsSchema,
      data,
      onChange: (state) => {
        data = state.data as JSONFormData<typeof numericSliderBasisPointsSchema>
      },
    })

    await userEvent.clear(screen.getByRole("spinbutton"))
    await userEvent.type(screen.getByRole("spinbutton"), "42.00")

    await waitFor(() => {
      expect(data).toEqual({ numericRangeValue: 42.0 })
    })
  })

  it("shows units in tooltip if set in UI schema", async () => {
    render({
      schema: numericSliderFinalGradeSchema,
      uischema: numericSliderPercentageUISchema,
    })
    const slider = screen.getByRole("slider")
    expect(screen.queryByText("50%")).toBeNull()
    await userEvent.hover(slider)

    await screen.findByText("50%")
  })
})
