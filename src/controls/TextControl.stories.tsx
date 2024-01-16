import { JsonForms } from "@jsonforms/react";
import { Meta, StoryObj } from "@storybook/react";
import { TextControlRegistryEntry } from "./TextControlRegistryEntry";
import { renderers } from "../renderers";

const meta: Meta<typeof JsonForms> = {
  title: "Json Forms Renderers",
  component: JsonForms,
};

export default meta;
type Story = StoryObj<typeof JsonForms>;

const schema = {
  type: "object",
  properties: { name: { type: "string" } },
};

export const TextControlStory: Story = {
  render: () => (
    <JsonForms
      data={{}}
      schema={schema}
      renderers={[...renderers, TextControlRegistryEntry]}
    />
  ),
};
