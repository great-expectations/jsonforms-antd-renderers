import { Meta, StoryObj } from "@storybook/react";
import { rendererRegistryEntries } from "../../renderers";
import { StorybookAntDJsonForm } from "../../common/StorybookAntDJsonForm";
import { datetimeSchema, datetimeUISchema } from "../../testSchemas/datetimeSchema";

const meta: Meta<typeof StorybookAntDJsonForm> = {
  title: "Control/Datetime",
  component: StorybookAntDJsonForm,
  tags: ["autodocs"],
  args: {
    jsonSchema: datetimeSchema,
    rendererRegistryEntries: [
      ...rendererRegistryEntries,
    ]
  },
  argTypes: {
    rendererRegistryEntries: {},
    jsonSchema: {
      control: "object",
    }
  }
};

export default meta;
type Story = StoryObj<typeof StorybookAntDJsonForm>;

export const Datetime: Story = {
  tags: ["autodocs"],
  args: { 
    jsonSchema: datetimeSchema, 
    // uiSchema: datetimeUISchema,
  },
}
