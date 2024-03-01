import { describe, expect, test, it } from "vitest"
import { screen, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { render } from "../common/test-render"
import { JSONSchema } from "json-schema-to-ts"
import {
  numberMinMaxSchema,
  numberSchema,
  numberUISchema,
  numberUISchemaWithRule,
} from "../testSchemas/numberSchema"

describe("NumberControl", () => {
  test("renders a number input with no UISchema provided", () => {
    render({
      schema: numberSchema,
    })

    expect(screen.getByText("My Number")).not.toBeNull()
  })

  it("Follows the hide rule", () => {
    render({
      data: 1000,
      schema: numberSchema,
      uischema: numberUISchemaWithRule,
    })
    expect(screen.queryByText("My Number")).toBeNull()
  })

  it.each([[0], [100]])("renders when data of %s is included", (data: number) => {
    render({
      data,
      schema: numberSchema, // this has a default of 1
      uischema: numberUISchema,
    })
    expect(screen.getByText("My Number")).not.toBeNull()
    expect(screen.getByRole("spinbutton")).toHaveValue(`${data}`)
  })

  it.each([[0], [100]])("renders default value of %s when no data is provided", (defaultValue: number) => {
    render({
      schema: { ...numberSchema, default: defaultValue },
      uischema: numberUISchema,
    })

    expect(screen.getByText("My Number")).not.toBeNull()
    expect(screen.getByRole("spinbutton")).toHaveValue(`${defaultValue}`)
  })
  it("renders default value when no data is provided", () => {
    render({
      schema: numberSchema,
      uischema: numberUISchema,
    })
    expect(screen.getByRole("spinbutton")).toHaveValue("1")
  })

  it("changes its value when users type", async () => {
    let data: JSONSchema
    render({
      schema: numberSchema,
      uischema: numberUISchema,
      onChange: (state: { data: JSONSchema }) => {
        data = state.data
      },
    })

    await userEvent.clear(screen.getByRole("spinbutton"))
    await userEvent.type(screen.getByRole("spinbutton"), "123")

    await waitFor(() => {
      expect(data).toBe(123)
    })
  })

  it("renders slider when min max values are present", () => {
    render({
      data: 1,
      schema: numberMinMaxSchema,
      uischema: numberUISchema,
    })
    expect(screen.getByText("My Number")).not.toBeNull()
    expect(screen.getByRole("spinbutton")).toHaveValue("100")
    expect(screen.getByRole("slider")).not.toBeNull()
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "1")
  })
  it("hides slider when min max values are not present", () => {
    render({
      schema: numberSchema,
      uischema: numberUISchema,
    })
    expect(screen.queryByRole("slider")).toBeNull()
  })
})