import { screen } from "@testing-library/react"
import { test, expect, describe } from "vitest"
import { render } from "../../common/test-render"
import userEvent from "@testing-library/user-event"
import { OneOfControlOptions } from "../../ui-schema"

import {
  SplitterUISchemaRegistryEntry,
  anyOfJsonSchema,
} from "../../testSchemas/anyOfSchema"

describe("AnyOf control", () => {
  test("AnyOf Control with default (radio) UISchema allows switching between subschemas", async () => {
    render({ schema: anyOfJsonSchema })
    // Column Name is available in both subschemas
    await screen.findByText("Splitter")
    screen.getByLabelText("Column Name")
    expect(screen.queryByLabelText("Method Name")).toHaveValue("split_on_year")

    // UiSchema is not set here, so we should see the Method Name changing

    await userEvent.click(screen.getByLabelText("Year - Month"))
    screen.getByLabelText("Column Name")
    expect(screen.queryByLabelText("Method Name")).toHaveValue(
      "split_on_year_and_month",
    )
  })
  test("AnyOf Control with button UISchema allows switching between subschemas and respects uiSchemaRegistryEntries", async () => {
    render({
      schema: anyOfJsonSchema,
      uischema: {
        type: "VerticalLayout",
        elements: [
          {
            type: "Control",
            scope: "#/properties/splitter",
            options: { optionType: "button" } satisfies OneOfControlOptions,
          },
        ],
      },
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
      schema: anyOfJsonSchema,
      uischema: {
        type: "VerticalLayout",
        elements: [
          {
            type: "Control",
            scope: "#/properties/splitter",
            options: { optionType: "dropdown" } satisfies OneOfControlOptions,
          },
        ],
      },
    })
    // Column Name is available in both subschemas
    await screen.findByText("Splitter")
    screen.getByLabelText("Column Name")
    expect(screen.queryByLabelText("Method Name")).toHaveValue("split_on_year")

    // Open the dropdown
    await userEvent.click(screen.getByText("Year"))

    // Select another option
    await userEvent.click(screen.getByText("Year - Month"))
    screen.getByLabelText("Column Name")
    expect(screen.queryByLabelText("Method Name")).toHaveValue(
      "split_on_year_and_month",
    )
  })
  test("OneOf Control persists state when switching between subschemas", async () => {
    render({ schema: anyOfJsonSchema })

    // Column Name is available in both subschemas
    await screen.findByText("Splitter")
    screen.getByLabelText("Column Name")
    await userEvent.type(screen.getByLabelText("Column Name"), "abc")

    await userEvent.click(screen.getByLabelText("Year - Month"))
    screen.getByLabelText("Column Name")
    expect(screen.queryByLabelText("Column Name")).not.toHaveValue("abc")
    await userEvent.type(screen.getByLabelText("Column Name"), "xyz")

    await userEvent.click(screen.getByLabelText("Year"))
    screen.getByLabelText("Column Name")
    expect(screen.queryByLabelText("Column Name")).toHaveValue("abc")
  })
})
