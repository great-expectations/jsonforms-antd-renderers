import { Meta, StoryObj } from "@storybook/react";
import { TextControlRegistryEntry } from "./TextControlRegistryEntry";
import { rendererRegistryEntries } from "../../renderers";
import { UISchema } from "../../ui-schema";
import { StorybookAntDJsonForm } from "../../common/StorybookAntDJsonForm";

const schema = {
  type: "object",
  properties: { name: { type: "string" } },
  // required: ["name"],
};

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
    rendererRegistryEntries: [
      ...rendererRegistryEntries,
      TextControlRegistryEntry,
    ],
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    rendererRegistryEntries: { table: { disable: true } },
    jsonSchema: {
      control: "object",
      description: "this is a simple schema with one property (name)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof StorybookAntDJsonForm>;

export const SingleLine: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: schema,
  },
  argTypes: {
    jsonSchema: {
      control: "object",
      description: "this is a simple schema with one property (name)",
    },
  }
};

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
