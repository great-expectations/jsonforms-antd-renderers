import { Meta, StoryObj } from "@storybook/react"
import { rendererRegistryEntries } from "../../renderer-registry-entries"
import { StorybookAntDJsonForm } from "../../common/StorybookAntDJsonForm"
import {
  datetimeSchema,
  datetimeUISchema,
} from "../../testSchemas/datetimeSchema"

const meta: Meta<typeof StorybookAntDJsonForm> = {
  title: "Control/Datetime",
  component: StorybookAntDJsonForm,
  tags: ["autodocs"],
  args: {
    jsonSchema: datetimeSchema,
    rendererRegistryEntries: [...rendererRegistryEntries],
  },
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

export const Datetime: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: datetimeSchema,
    uiSchema: datetimeUISchema,
  },
}
