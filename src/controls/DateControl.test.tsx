import { describe, expect, test, it } from "vitest"
import { render } from "../common/test-render"

import { screen } from "@testing-library/react"
import {
  dateSchema,
  dateUISchema,
  dateUISchemaWithRule,
} from "../testSchemas/dateSchema"
import { isDateControl, rankWith } from "@jsonforms/core"
import { UISchema } from ".."

describe("DateControlTester", () => {
  test("tester works", () => {
    const uiSchema = {
      type: "Control",
      scope: "#/properties/date",
    }
    const schema = {
      type: "string",
      title: "The Future is Now",
      format: "date",
    }
    const context = { rootSchema: dateSchema, config: {} }

    expect(rankWith(1, isDateControl)(uiSchema, schema, context)).toBe(1)
  })
})
describe("DateControl", () => {
  // FYI this date is treated as UTC
  const timestamp: Date = new Date("2023-07-18")
  const title = "The Future is Now"
  test("renders a datetime input with no UISchema provided", async () => {
    render({
      schema: dateSchema,
    })
    await screen.findByText(title)
  })

  it("Follows the hide rule", () => {
    render({
      data: { date: timestamp },
      schema: dateSchema,
      uischema: dateUISchemaWithRule,
    })
    expect(screen.queryByText(title)).toBeNull()
  })

  it("renders when data is included", async () => {
    render({
      data: { date: timestamp },
      schema: dateSchema,
      uischema: dateUISchema,
    })
    await screen.findByText(title)
    // Should use the default date format
    await screen.findByDisplayValue("07/18/2023")
  })

  it("respects dateFormat", async () => {
    render({
      data: { date: timestamp },
      schema: dateSchema,
      uischema: {
        type: "VerticalLayout",
        elements: [
          {
            type: "Control",
            scope: "#/properties/date",
            options: {
              dateFormat: "YYYY MM DD",
            },
          },
        ],
      } satisfies UISchema,
    })

    await screen.findByDisplayValue("2023 07 18")
  })
})
