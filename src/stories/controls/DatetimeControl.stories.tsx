import { Meta, StoryObj } from "@storybook/react";
import { cellRegistryEntries, rendererRegistryEntries } from "../../renderers";
import { StorybookAntDJsonForm } from "../../common/StorybookAntDJsonForm";
import { datetimeSchema, datetimeUISchema } from "../../testSchemas/datetimeSchema";
import { JsonForms } from "@jsonforms/react";
import { DatetimeControl } from "../../controls/DatetimeControl";

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
    rendererRegistryEntries: { table: { disable: true } },
    uiSchemaRegistryEntries: { table: { disable: true } },
    jsonSchema: {
      control: "object",
    },
    data: {table: {disable: true}}, 
    config: {control: "object"},
    onChange: {table: {disable: true, action: "on-change"}},
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

export const DateTimeControlUsingJsonForms: Story = {
  render: () => (
    <JsonForms
      data={{datetime: "2023-07-18T01:02:01.182Z"}}
      schema={datetimeSchema}
      cells={[...cellRegistryEntries]}
      renderers={[...rendererRegistryEntries]}
    />
  ),
}

export const DateTimeControlComponent: Story = {
  argTypes: {
    rendererRegistryEntries: { table: { disable: true } },
    uiSchemaRegistryEntries: { table: { disable: true } },
    jsonSchema: {
      control: "object",
    },
    data: {table: {disable: true}}, 
    config: {control: "object"},
    onChange: {table: {disable: true, action: "on-change"}},
  },
  render: () => (
    <DatetimeControl
      data="2023-07-18T01:02:01.182Z"
      path="datetime"
      schema={datetimeSchema}
      handleChange={(result) => console.log(result)}
      label="Datetime"
      uischema={datetimeUISchema["elements"][0]}
      errors=""
      rootSchema={{}}
      id=""
      enabled={true}
      visible={true}
    />
  ),
}