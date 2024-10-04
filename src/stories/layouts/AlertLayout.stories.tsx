import { Meta, StoryObj } from "@storybook/react"
import { rendererRegistryEntries } from "../../renderer-registry-entries"
import { UISchema } from "../../ui-schema"
import { StorybookAntDJsonForm } from "../../common/StorybookAntDJsonForm"
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

const meta: Meta<typeof StorybookAntDJsonForm> = {
  title: "Layout/Alert",
  component: StorybookAntDJsonForm,
  tags: ["autodocs"],
  args: {
    jsonSchema: schema,
    rendererRegistryEntries: [...rendererRegistryEntries],
  },
  argTypes: {
    rendererRegistryEntries: { table: { disable: true } },
    uiSchemaRegistryEntries: { table: { disable: true } },
    jsonSchema: {
      control: "object",
    },
    data: { table: { disable: true } },
    config: { control: "object" },
    onChange: { table: { disable: true, action: "on-change" } },
  },
}

export default meta
type Story = StoryObj<typeof StorybookAntDJsonForm>

export const Info: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: schema,
    uiSchema: {
      type: "VerticalLayout",
      elements: [
        {
          type: "Label",
          text: "To maintain airspeed velocity, a swallow needs to beat its wings 43 times every second.",
          options: {
            type: "info",
          },
        },
      ],
    } satisfies UISchema<typeof schema>,
  },
}

export const Warning: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: schema,
    uiSchema: {
      type: "VerticalLayout",
      elements: [
        {
          type: "Label",
          text: "Here be dragons!",
          options: {
            type: "warning",
          },
        },
      ],
    } satisfies UISchema<typeof schema>,
  },
}

export const Success: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: schema,
    uiSchema: {
      type: "VerticalLayout",
      elements: [
        {
          type: "Label",
          text: "You did it!",
          options: {
            type: "success",
          },
        },
      ],
    } satisfies UISchema<typeof schema>,
  },
}

export const Mardown: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: schema,
    uiSchema: {
      type: "VerticalLayout",
      elements: [
        {
          type: "Label",
          text: `just regular text


# Title 1

[Link Text](https://example.com "Link Title")

## Title 2
_italic_

### Title 3
**bold**

#### Title 4
\`<Code Block />\`

##### Title 5
- ul1
- ul2
- ul3

###### Title 6
1. ol1
2. ol2

---

`,
        },
      ],
    } satisfies UISchema<typeof schema>,
  },
}
