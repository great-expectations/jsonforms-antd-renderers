import { screen, waitFor } from "@testing-library/react"
import { test, expect, describe } from "vitest"
import { render, strictRender } from "../../common/test-render"
import userEvent from "@testing-library/user-event"

import {
  AnyOfWithDefaultsBaseUISchema,
  AnyOfWithDefaultsSchema,
  AnyOfWithDefaultsUISchemaRegistryEntries,
  SplitterUISchemaRegistryEntry,
  splitterAnyOfJsonSchema,
} from "../../testSchemas/anyOfSchema"
import { UISchema } from "../../ui-schema"
import { JSONFormData } from "../../common/schema-derived-types"

const uischema: UISchema<typeof splitterAnyOfJsonSchema> = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/splitter",
      options: {
        optionType: "button",
        subschemaTitleToLabelMap: {
          SplitterYear: "Year",
          SplitterYearAndMonthAndDay: "Year - Month - Day",
          SplitterYearAndMonth: "Year - Month",
        },
      },
    },
  ],
}

describe("AnyOf control", () => {
  test("AnyOf Control with default (radio) UISchema allows switching between subschemas", async () => {
    render({ schema: splitterAnyOfJsonSchema })
    // Column Name is available in both subschemas
    await screen.findByText("Splitter")
    screen.getByLabelText("Column Name")
    screen.getByTitle("split_on_year")
    expect(screen.queryByTitle("split_on_year_and_month")).not.toBeInTheDocument()

    // UiSchema is not set here, so we should see the Method Name changing

    await userEvent.click(screen.getByLabelText("SplitterYearAndMonth"))
    screen.getByLabelText("Column Name")
    screen.getByTitle("split_on_year_and_month")
  })
  test("AnyOf Control with button UISchema allows switching between subschemas and respects uiSchemaRegistryEntries", async () => {
    render({
      schema: splitterAnyOfJsonSchema,
      uischema,
      uiSchemaRegistryEntries: [SplitterUISchemaRegistryEntry],
    })
    // Column Name is available in both subschemas
    await screen.findByText("Splitter")
    // Should relabel the Column Name field
    expect(screen.queryByLabelText("Column Name")).not.toBeInTheDocument()
    screen.getByLabelText("Column of datetime type")

    // UiSchema should hide the Method Name field on both subschemas
    expect(screen.queryByLabelText("Method Name")).not.toBeInTheDocument()

    await userEvent.click(screen.getByText("Year - Month"))
    expect(screen.queryByLabelText("Column Name")).not.toBeInTheDocument()
    screen.getByLabelText("Column of datetime type")
    expect(screen.queryByLabelText("Method Name")).not.toBeInTheDocument()
  })
  test("AnyOf Control with dropdown UISchema allows switching between subschemas", async () => {
    render({
      schema: splitterAnyOfJsonSchema,
      uischema,
    })
    // Column Name is available in both subschemas
    await screen.findByText("Splitter")
    screen.getByLabelText("Column Name")
    screen.getByTitle("split_on_year")
    expect(screen.queryByTitle("split_on_year_and_month")).not.toBeInTheDocument()

    // Open the dropdown
    await userEvent.click(screen.getByText("Year"))

    // Select another option
    await userEvent.click(screen.getByText("Year - Month"))
    screen.getByLabelText("Column Name")
    screen.getByTitle("split_on_year_and_month")
  })
  test("AnyOf Control persists state when switching between subschemas", async () => {
    render({ schema: splitterAnyOfJsonSchema })

    // Column Name is available in both subschemas
    await screen.findByText("Splitter")
    screen.getByLabelText("Column Name")
    await userEvent.type(screen.getByLabelText("Column Name"), "abc")

    await userEvent.click(screen.getByLabelText("SplitterYearAndMonth"))
    screen.getByLabelText("Column Name")
    expect(screen.queryByLabelText("Column Name")).not.toHaveValue("abc")
    await userEvent.type(screen.getByLabelText("Column Name"), "xyz")

    await userEvent.click(screen.getByLabelText("SplitterYear"))
    screen.getByLabelText("Column Name")
    expect(screen.queryByLabelText("Column Name")).toHaveValue("abc")
  })
  test("provides a default value for a required combinator", async () => {
    let data: JSONFormData<typeof AnyOfWithDefaultsSchema> = {}
    const onChange = (result: {
      data: JSONFormData<typeof AnyOfWithDefaultsSchema>
    }) => {
      data = result.data
    }
    strictRender({
      data: {},
      onChange,
      schema: AnyOfWithDefaultsSchema,
      uischema: AnyOfWithDefaultsBaseUISchema,
      uiSchemaRegistryEntries: AnyOfWithDefaultsUISchemaRegistryEntries,
    })
    await waitFor(() => {
      expect(data?.contactMethod?.method).toEqual("smokesignal")
    })
    await screen.findByText("Pattern")
    await userEvent.click(screen.getByText("Submit"))
    await screen.findByText("Pattern is required", { exact: false })
    expect(
      screen.queryByText("contactMethod is required", { exact: false }),
    ).toBeNull()
  })
})
