import { describe, expect, test, it } from "vitest"
import { act, screen, waitFor } from "@testing-library/react"
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
  numberHumiditySchema,
  numberPercentageUISchema,
  numberTemperatureSchema,
  numberTemperatureUISchema,
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
    // create a new schema with a default value set
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

  it("doesn't show slider when min max values are not present", () => {
    render({
      schema: numberMagnitudeSchema,
      uischema: numberMagnitudeUISchema,
    })
    expect(screen.queryByRole("slider")).toBeNull()
  })
})

it ("renders slider and input box when number of steps is greater than threshold", () => {
  const data = { basisPoints: 1 }
  render({
    data: data,
    schema: numberBasisPointsSchema,  // 10,000 steps created by multipleOf
    uischema: numberBasisPointsUISchema,
  })
  expect(screen.getByRole("slider"))
  expect(screen.getByRole("spinbutton"))
})

it ("renders slider without input box when number of steps is less than threshold", () => {
  const data = { basisPoints: 1 }
  render({
    data: data,
    schema: numberHumiditySchema,  // 100 steps
    uischema: numberPercentageUISchema,
  })
  expect(screen.getByRole("slider"))
  expect(screen.queryByRole("spinbutton")).toBeNull()
})

it ("shows error message onBlur when field is required and empty", async () => {
  render({
    schema: numberTheNumberSchema,
    uischema: numberTheNumberUISchema,
  })
  const input = screen.getByRole("spinbutton")
  await act(async() => userEvent.clear(input))
  act(() => input.blur())
  expect(await screen.findByText("The Number is required")).not.toBeNull()
})

it ("shows units in text control if set in UI schema", async () => {
  render({
    schema: numberTemperatureSchema,
    uischema: numberTemperatureUISchema,
  })
  expect(await screen.findByText("°F")).not.toBeNull()
})

it ("shows units in tooltip if set in UI schema", async () => {
  render({
    schema: numberHumiditySchema,
    uischema: numberPercentageUISchema,
  })
  // we are using a schema that doesn't have the text input,
  // so we can be sure the units are showing up in the tooltip
  expect(screen.queryByRole("spinbutton")).toBeNull()
  const slider = screen.getByRole("slider")
  expect(screen.queryByText("0%")).toBeNull()
  await act(async() => userEvent.hover(slider))
  expect(await screen.findByText("0%")).not.toBeNull()
})