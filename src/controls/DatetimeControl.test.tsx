import { describe, expect, test, it } from "vitest"
import { render } from "../common/test-render"

import { screen } from "@testing-library/react"
import { datetimeSchema, datetimeUISchema, datetimeUISchemaWithRule } from "../testSchemas/datetimeSchema"

describe("DatetimeControl", () => {
  const timestamp = "2023-07-18T01:02:01.182Z"
  const title = "The Future is Now"
  test("renders a datetime input with no UISchema provided", () => {
    render({
      schema: datetimeSchema,
    })
    expect(screen.getByText(title)).not.toBeNull()
  })

  it("Follows the hide rule", () => {
    render({
      data: timestamp,
      schema: datetimeSchema,
      uischema: datetimeUISchemaWithRule,
    })
    expect(screen.queryByText(title)).toBeNull()
  })

  it("renders when data is included", () => {
    render({
      data: timestamp,
      schema: datetimeSchema,
      uischema: datetimeUISchema,
    })
    expect(screen.getByText(title)).not.toBeNull()
  })
})
