import { Meta, StoryObj } from "@storybook/react"
import { rendererRegistryEntries } from "../../renderer-registry-entries"
import { UISchema } from "../../ui-schema"
import { StorybookAntDJsonForm } from "../../common/StorybookAntDJsonForm"
import { JSONSchema } from "json-schema-to-ts"

const schema = {
  type: "object",
  properties: { checkbox: { type: "boolean" } },
} satisfies JSONSchema

const metaUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/checkbox",
      label: "Checkbox",
    },
  ],
} satisfies UISchema<typeof schema>

const meta: Meta<typeof StorybookAntDJsonForm> = {
  title: "Control/Boolean",
  component: StorybookAntDJsonForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  args: {
    jsonSchema: schema,
    uiSchema: metaUISchema,
    rendererRegistryEntries: [...rendererRegistryEntries],
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
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

export const SingleLine: Story = {
  parameters: { controls: { expanded: true } },
  tags: ["autodocs"],
  args: { jsonSchema: schema },
  argTypes: {
    jsonSchema: {
      table: {},
      control: "object",
      description: "this is a simple schema with one property (name)",
    },
  },
}
