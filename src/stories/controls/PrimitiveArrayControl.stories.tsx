import type { Meta, StoryObj } from "@storybook/react"

import { rendererRegistryEntries } from "../../renderer-registry-entries"
import { JSONSchema } from "json-schema-to-ts"
import { StorybookAntDJsonForm } from "../../common/StorybookAntDJsonForm"
import {
  stringArrayControlJsonSchema,
  arrayControlUISchema,
} from "../../testSchemas/arraySchema"

const meta: Meta<typeof StorybookAntDJsonForm> = {
  title: "Control/Primitive Array",
  component: StorybookAntDJsonForm,
  tags: ["autodocs"],
  args: {
    jsonSchema: stringArrayControlJsonSchema,
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

export const ArrayOfStringsAsRequired: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: {
      type: "object",
      properties: {
        assets: {
          type: "array",
          items: {
            type: "string",
            title: "Asset",
          },
        },
      },
      required: ["assets"],
    } satisfies JSONSchema,
    uiSchema: arrayControlUISchema,
  },
}

export const ArrayOfNumbersWithoutRequired: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: {
      type: "object",
      properties: {
        assets: {
          type: "array",
          items: {
            type: "number",
          },
        },
      },
    } satisfies JSONSchema,
    uiSchema: arrayControlUISchema,
  },
}
