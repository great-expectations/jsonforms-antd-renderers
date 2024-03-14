import { Meta, StoryObj } from "@storybook/react";
import { rendererRegistryEntries } from "../../renderers";
import { TextControlOptions, UISchema } from "../../ui-schema";
import { StorybookAntDJsonForm } from "../../common/StorybookAntDJsonForm";

const schema = {
  type: "object",
  properties: { name: { type: "string" } },
  // required: ["name"],
}

const meta: Meta<typeof StorybookAntDJsonForm> = {
  title: "Control/Text",
  component: StorybookAntDJsonForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  args: {
    jsonSchema: schema,
    uiSchema: {
      type: "VerticalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/name",
          label: "Name",
        },
      ],
    } satisfies UISchema,
    rendererRegistryEntries: [...rendererRegistryEntries],
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    rendererRegistryEntries: { table: { disable: true } },
    jsonSchema: {
      control: "object",
      description: "this is a simple schema with one property (name)",
    },
    uiSchemaRegistryEntries: { table: { disable: true } },
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

export const MultiLine: Story = {
  args: {
    jsonSchema: schema,
    uiSchema: {
      type: "VerticalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/name",
          label: "Name",
          options: { type: "multiline" },
        },
      ],
    } satisfies UISchema,
  },
};

export const Password: Story = {
  args: {
    jsonSchema: schema,
    uiSchema: {
      type: "VerticalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/name",
          label: "Name",
          options: { type: "password" },
        },
      ],
    } satisfies UISchema,
  },
};

export const RuleDefinedInUISchema: Story = {
  args: {
    jsonSchema: schema,
    uiSchema: {
      type: "VerticalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/name",
          label: "Name",
          options: {
            rules: [
              {
                pattern: new RegExp("^(?! ).*(?<! )$"), // no leading or trailing spaces
                message: "Name cannot start or end with a space"
              },
            ],
          } satisfies TextControlOptions,
        },
      ],
    } satisfies UISchema,
  },
};
