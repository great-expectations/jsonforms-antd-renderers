import { Meta, StoryObj } from "@storybook/react"
import { rendererRegistryEntries } from "../../renderer-registry-entries"
import { StorybookAntDJsonForm } from "../../common/StorybookAntDJsonForm"

import {
  objectSchema,
  objectUISchemaWithName,
  objectUISchemaWithNameAndLastName,
  objectUISchemaWithRule,
} from "../../testSchemas/objectSchema"

const meta: Meta<typeof StorybookAntDJsonForm> = {
  title: "Control/Object",
  component: StorybookAntDJsonForm,
  tags: ["autodocs"],
  args: {
    jsonSchema: objectSchema,
    rendererRegistryEntries: [...rendererRegistryEntries],
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    rendererRegistryEntries: { table: { disable: true } },
    jsonSchema: {
      control: "object",
    },
    uiSchemaRegistryEntries: { table: { disable: true } },
    data: { table: { disable: true } },
    config: { control: "object" },
    onChange: { table: { disable: true, action: "on-change" } },
  },
}

export default meta
type Story = StoryObj<typeof StorybookAntDJsonForm>

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
