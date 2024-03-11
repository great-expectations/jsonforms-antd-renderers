import { Meta, StoryObj } from "@storybook/react";
import { rendererRegistryEntries } from "../../renderers";
import { StorybookAntDJsonForm } from "../../common/StorybookAntDJsonForm";
import { objectSchema, objectUISchemaWithName, objectUISchemaWithNameAndLastName, objectUISchemaWithRule } from "../../testSchemas/objectSchema";

const meta: Meta<typeof StorybookAntDJsonForm> = {
  title: "Control/Object",
  component: StorybookAntDJsonForm,
  tags: ["autodocs"],
  args: {
    jsonSchema: objectSchema,
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

export const ObjectWithUISchemaContainingOnlyName: Story = {
  tags: ["autodocs"],
  args: { 
    jsonSchema: objectSchema, 
    uiSchema: objectUISchemaWithName,
  },
}

export const ObjectWithUISchemaContainingBothNameAndLastName: Story = {
  tags: ["autodocs"],
  args: { 
    jsonSchema: objectSchema, 
    uiSchema: objectUISchemaWithNameAndLastName,
  },
}

export const ObjectWithRuleHidingLastNameIfNameIsJohn: Story = {
  tags: ["autodocs"],
  args: { 
    jsonSchema: objectSchema,
    uiSchema: objectUISchemaWithRule,
  },
}