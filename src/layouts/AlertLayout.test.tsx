import { test, expect } from "vitest"
import { screen } from "@testing-library/react"
import { render } from "../common/test-render"
import { JSONSchema } from "json-schema-to-ts"

const schema = {
  type: "object",
  properties: {
    text: { type: "string" },
    options: {
      type: "object",
      properties: {
        type: {
          type: "string",
        },
      },
    },
  },
} satisfies JSONSchema

test("AlertLayout renders", async () => {
  render({
    schema: schema,
    uischema: {
      type: "VerticalLayout",
      elements: [
        {
          type: "Label",
          text: "An African swallow, maybe -- but not a European swallow, that's my point.",
        },
      ],
    },
  })
  await screen.findByRole("alert")
})

test("AlertLayout renders markdown content", async () => {
  render({
    schema,
    uischema: {
      type: "VerticalLayout",
      elements: [
        {
          type: "Label",
          text: `# Title 1

## Title 2

### Title 3

#### Title 4

##### Title 5

###### Title 6

[Link Text](https://example.com "Link Title")

\`Code Block\`

- ul1
- ul2
- ul3

1. ol1
2. ol2

just regular text
`,
        },
      ],
    },
  })

  await screen.findByRole("alert")
  expect(screen.getByText("Link Text")).toHaveAttribute(
    "href",
    "https://example.com",
  )
  const link = screen.getByText("Link Text")
  expect(link).toHaveAttribute("title", "Link Title")
  expect(link).toHaveAttribute("target", "_blank")
  expect(link).toHaveAttribute("rel", "noreferrer")
  expect(link).toHaveAttribute("href", "https://example.com")
  expect(link.tagName).toBe("A")
  expect(screen.getByText("just regular text").tagName).toBe("SPAN")
})
