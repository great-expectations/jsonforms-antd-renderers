import { Meta, StoryObj } from "@storybook/react"
import { rendererRegistryEntries } from "../../renderer-registry-entries"
import { StorybookAntDJsonForm } from "../../common/StorybookAntDJsonForm"
import {
  dateSchema,
  dateUISchema,
  dateUISchemaWithFormatOption,
} from "../../testSchemas/dateSchema"

const meta: Meta<typeof StorybookAntDJsonForm> = {
  title: "Control/Date",
  component: StorybookAntDJsonForm,
  tags: ["autodocs"],
  args: {
    jsonSchema: dateSchema,
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

export const RegularDate: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: dateSchema,
    uiSchema: dateUISchema,
  },
}

export const RequiredDate: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: {
      ...dateSchema,
      required: ["date"],
    },
    uiSchema: dateUISchema,
  },
}

export const DateWithOptionFormat: Story = {
  tags: ["autodocs"],
  args: {
    data: { date: new Date("2021-01-01") },
    jsonSchema: {
      ...dateSchema,
      required: ["date"],
    },
    uiSchema: dateUISchemaWithFormatOption,
  },
}
