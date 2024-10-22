import { test, expect } from "vitest"
import { screen, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"

import { render } from "../common/test-render"
import { dateTimeSchema } from "../testSchemas/dateTimeSchema"
import { UISchema } from "../ui-schema"

const EXAMPLE_DATESTRING = "2021-08-09 12:34:56"
const USER_DATESTRING = EXAMPLE_DATESTRING.replace(" ", "")
const TITLE = dateTimeSchema.properties.dateTime.title

test("renders the date that the user selects", async () => {
  render({
    schema: dateTimeSchema,
  })
  const input = await screen.findByLabelText(TITLE)
  await userEvent.type(input, USER_DATESTRING)

  await waitFor(() => expect(input).toHaveValue(EXAMPLE_DATESTRING))
})

test("renders default date when present", async () => {
  render({
    schema: {
      ...dateTimeSchema,
      properties: {
        dateTime: {
          ...dateTimeSchema.properties.dateTime,
          default: EXAMPLE_DATESTRING,
        },
      },
    },
  })
  const input = await screen.findByLabelText(TITLE)
  expect(input).toHaveValue(EXAMPLE_DATESTRING)
})

test("updates jsonforms data as expected", async () => {
  let data: Record<string, unknown> = {}
  render({
    schema: dateTimeSchema,
    data,
    onChange: (result) => {
      data = result.data as Record<string, unknown>
    },
  })
  const input = await screen.findByLabelText(TITLE)
  await userEvent.type(input, USER_DATESTRING)
  await userEvent.click(screen.getByText("Submit"))
  await waitFor(() => {
    expect(data).toEqual({
      dateTime: EXAMPLE_DATESTRING,
    })
  })
})

test("renders required message if no value and interaction", async () => {
  render({
    schema: {
      ...dateTimeSchema,
      required: ["dateTime"],
    },
  })
  const input = await screen.findByLabelText(TITLE)
  await userEvent.clear(input)
  await userEvent.tab()
  await screen.findByText(`${TITLE} is required`)
})

test(" does not show required message if not requried", async () => {
  render({
    schema: dateTimeSchema,
  })
  const input = await screen.findByLabelText(TITLE)
  await userEvent.clear(input)
  await userEvent.tab()
  await waitFor(() => {
    expect(screen.queryByText(`${TITLE} is required`)).toBeNull()
  })
})

test("showTime option should have visible 'now' button", async () => {
  const uischema = {
    type: "VerticalLayout",
    elements: [
      {
        type: "Control",
        scope: "#/properties/dateTime",
        label: "Date Time",
        options: {
          showTime: true,
        },
      },
    ],
  } satisfies UISchema<typeof dateTimeSchema>

  render({
    schema: dateTimeSchema,
    uischema,
  })
  const input = await screen.findByLabelText(TITLE)
  await userEvent.click(input)
  await screen.findByText("Now")
})

test("renders default props if invalid props are submitted", async () => {
  const uischema = {
    type: "VerticalLayout",
    elements: [
      {
        type: "Control",
        scope: "#/properties/dateTime",
        label: "Date Time",
        options: {
          /** @ts-expect-error to test the fail route we need to provide an invalid prop */
          foo: "bar",
          showTime: true,
        },
      },
    ],
  } satisfies UISchema<typeof dateTimeSchema>

  render({
    schema: dateTimeSchema,
    uischema,
  })
  const input2 = await screen.findByLabelText(TITLE)
  await userEvent.click(input2)
  // instead of "now" should see "today"
  // since our default doesn't show time
  await screen.findByText("Today")
})
