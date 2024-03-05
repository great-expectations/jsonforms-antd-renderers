import { describe, expect, test, it } from "vitest"
import { screen, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { render } from "../common/test-render"
import { JSONSchema } from "json-schema-to-ts"
import {
  numberBasisPointsSchema,
  numberBasisPointsUISchema,
  numberMagnitudeSchema,
  numberMagnitudeUISchema,
  numberTheNumberSchema,
  numberTheNumberUISchema,
  numberUISchemaWithRule,
} from "../testSchemas/numberSchema"

describe("NumberControl", () => {
  test("renders a number input with no UISchema provided", () => {
    render({
      schema: numberMagnitudeSchema,
    })

    expect(screen.getByText("Magnitude")).not.toBeNull()
  })

  it("Follows the hide rule", () => {
    const data = { magnitude: 1000 }
    render({
      data: data,
      schema: numberMagnitudeSchema,
      uischema: numberUISchemaWithRule,
    })
    expect(screen.queryByText("Magnitude")).toBeNull()
  })

  it.each([[0], [100]])("renders when data of %s is included", (dataVal: number) => {
    const data = { theNumber: dataVal}
    render({
      data: data,
      schema: numberTheNumberSchema, // this has a default of 42.42
      uischema: numberTheNumberUISchema,
    })
    expect(screen.getByText("The Number")).not.toBeNull()
    expect(screen.getByRole("spinbutton")).toHaveValue(`${dataVal}`)
  })

  it.each([[0], [100]])("renders default value of %s when no data is provided", (defaultValue: number) => {
    const { properties, ...rest } = numberMagnitudeSchema
    properties.magnitude = { ...properties.magnitude, ...{ default: defaultValue }}
    render({
      schema: { ...rest, properties },
      uischema: numberMagnitudeUISchema,
    })

    expect(screen.getByText("Magnitude")).not.toBeNull()
    expect(screen.getByRole("spinbutton")).toHaveValue(`${defaultValue}`)
  })
  it("renders default value when no data is provided", () => {
    render({
      schema: numberTheNumberSchema,
      uischema: numberTheNumberUISchema,
    })
    expect(screen.getByRole("spinbutton")).toHaveValue("42.42")
  })

  it("changes its value when users type", async () => {
    let data: JSONSchema
    render({
      schema: numberMagnitudeSchema,
      uischema: numberMagnitudeUISchema,
      onChange: (state: { data: JSONSchema }) => {
        data = state.data
      },
    })

    await userEvent.clear(screen.getByRole("spinbutton"))
    await userEvent.type(screen.getByRole("spinbutton"), "123")

    await waitFor(() => {
      expect(data).toEqual({ magnitude: 123 })
    })
  })

  it("renders slider when min max values are present", () => {
    const data = { basisPoints: 1 }
    render({
      data: data,
      schema: numberBasisPointsSchema,
      uischema: numberBasisPointsUISchema,
    })
    expect(screen.getByText("Basis Points")).not.toBeNull()
    expect(screen.getByRole("spinbutton")).toHaveValue("1")
    expect(screen.getByRole("slider")).not.toBeNull()
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "1")
  })
  it("hides slider when min max values are not present", () => {
    render({
      schema: numberMagnitudeSchema,
      uischema: numberMagnitudeUISchema,
    })
    expect(screen.queryByRole("slider")).toBeNull()
  })
})