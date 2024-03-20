import { describe, expect, test, it } from "vitest"
import { render } from "../common/test-render"

import { screen } from "@testing-library/react"
import {
  datetimeSchema,
  datetimeUISchema,
  datetimeUISchemaWithRule,
} from "../testSchemas/datetimeSchema"
import { isDateTimeControl, rankWith } from "@jsonforms/core"

describe("DatetimeControlTester", () => {
  test("tester works", () => {
    const uiSchema = {
      type: "Control",
      scope: "#/properties/datetime",
    }
    const schema = {
      type: "string",
      title: "The Future is Now",
      format: "date-time",
    }
    const context = { rootSchema: datetimeSchema, config: {} }

    expect(rankWith(1, isDateTimeControl)(uiSchema, schema, context)).toBe(1)
  })
})
describe("DatetimeControl", () => {
  const timestamp = "2023-07-18T01:02:01.182Z"
  const title = "The Future is Now"
  test("renders a datetime input with no UISchema provided", async () => {
    render({
      schema: datetimeSchema,
    })
    await screen.findByText(title)
  })

  it("Follows the hide rule", () => {
    render({
      data: { datetime: timestamp },
      schema: datetimeSchema,
      uischema: datetimeUISchemaWithRule,
    })
    expect(screen.queryByText(title)).toBeNull()
  })

  it("renders when data is included", async () => {
    render({
      data: { datetime: timestamp },
      schema: datetimeSchema,
      uischema: datetimeUISchema,
    })
    await screen.findByText(title)
  })
})
