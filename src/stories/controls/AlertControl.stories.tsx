import { Meta, StoryObj } from "@storybook/react"
import { rendererRegistryEntries } from "../../renderer-registry-entries"
import { UISchema } from "../../ui-schema"
import { StorybookAntDJsonForm } from "../../common/StorybookAntDJsonForm"

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
}

const meta: Meta<typeof StorybookAntDJsonForm> = {
  title: "Control/Alert",
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
    } satisfies UISchema,
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
    } satisfies UISchema,
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
    } satisfies UISchema,
  },
}
