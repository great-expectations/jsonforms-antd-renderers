import { Meta, StoryObj } from "@storybook/react"
import { rendererRegistryEntries } from "../../renderer-registry-entries"
import { OneOfControlOptions, UISchema } from "../../ui-schema"
import { StorybookAntDJsonForm } from "../../common/StorybookAntDJsonForm"
import {
  SplitterUISchemaRegistryEntry,
  anyOfJsonSchema,
} from "../../testSchemas/anyOfSchema"

const meta: Meta<typeof StorybookAntDJsonForm> = {
  title: "Control/AnyOf",
  component: StorybookAntDJsonForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  args: {
    jsonSchema: anyOfJsonSchema,
    uiSchema: {
      type: "VerticalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/splitter",
        },
      ],
    } satisfies UISchema,
    rendererRegistryEntries: [...rendererRegistryEntries],
    uiSchemaRegistryEntries: [SplitterUISchemaRegistryEntry],
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    rendererRegistryEntries: { table: { disable: true } },
    jsonSchema: {
      control: "object",
      description: "this is a minimal anyOf combinator schema",
    },
    uiSchemaRegistryEntries: { table: { disable: true } },
    data: { table: { disable: true } },
    config: { control: "object" },
    onChange: { table: { disable: true, action: "on-change" } },
  },
}

export default meta
type Story = StoryObj<typeof StorybookAntDJsonForm>

export const RadioGroup: Story = {
  parameters: { controls: { expanded: true } },
  tags: ["autodocs"],
  args: {
    jsonSchema: anyOfJsonSchema,
    uiSchema: {
      type: "VerticalLayout",
      elements: [{ type: "Control", scope: "#/properties/splitter" }],
    },
  },
  argTypes: {
    jsonSchema: {
      control: "object",
      description: "this is a minimal anyOf combinator schema",
    },
  },
}

export const Button: Story = {
  parameters: { controls: { expanded: true } },
  tags: ["autodocs"],
  args: {
    jsonSchema: anyOfJsonSchema,
    uiSchema: {
      type: "VerticalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/splitter",
          options: { optionType: "button" } satisfies OneOfControlOptions,
        },
      ],
    },
  },
  argTypes: {
    jsonSchema: {
      control: "object",
      description: "this is a minimal anyOf combinator schema",
    },
  },
}

export const Dropdown: Story = {
  parameters: { controls: { expanded: true } },
  tags: ["autodocs"],
  args: {
    jsonSchema: anyOfJsonSchema,
    uiSchema: {
      type: "VerticalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/splitter",
          options: { optionType: "dropdown" } satisfies OneOfControlOptions,
        },
      ],
    },
  },
  argTypes: {
    jsonSchema: {
      control: "object",
      description: "this is a minimal anyOf combinator schema",
    },
  },
}
