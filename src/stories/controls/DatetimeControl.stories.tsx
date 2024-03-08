import { Meta, StoryObj } from "@storybook/react";
import { cellRegistryEntries, rendererRegistryEntries } from "../../renderers";
import { StorybookAntDJsonForm } from "../../common/StorybookAntDJsonForm";
import { datetimeSchema, datetimeUISchema } from "../../testSchemas/datetimeSchema";
import { JsonForms } from "@jsonforms/react";

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
    uiSchema: datetimeUISchema,
  },
}

export const DateTimeControl: Story = {
  render: () => (
    <JsonForms
      data={{datetime: "2023-07-18T01:02:01.182Z"}}
      schema={datetimeSchema}
      cells={[...cellRegistryEntries]}
      renderers={[...rendererRegistryEntries]}
    />
  ),
}