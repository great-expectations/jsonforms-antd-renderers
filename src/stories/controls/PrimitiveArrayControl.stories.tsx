import type { Meta, StoryObj } from "@storybook/react"
import { JSONSchema } from "json-schema-to-ts"
import { StorybookAntDJsonForm } from "../../common/StorybookAntDJsonForm"
import {
  stringArrayControlJsonSchema,
  arrayControlUISchema,
  arrayControlTooltipUISchema,
  arrayControlSortableUISchema,
  arrayControlUISchemaWithIcons,
  arrayControlSortableWithIconsUISchema,
} from "../../testSchemas/arraySchema"

const meta: Meta<typeof StorybookAntDJsonForm> = {
  title: "Control/Primitive Array",
  component: StorybookAntDJsonForm,
  tags: ["autodocs"],
  args: {
    jsonSchema: stringArrayControlJsonSchema,
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
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

export const ArrayOfEnums: Story = {
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
            enum: ["foo", "bar", "baz"],
          },
        },
      },
      required: ["assets"],
    } satisfies JSONSchema,
    uiSchema: arrayControlUISchema,
  },
}

export const ArrayOfDateTimes: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: {
      type: "object",
      properties: {
        assets: {
          type: "array",
          items: {
            type: "string",
            title: "Dates",
            format: "date-time",
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

export const PrePopulatedArray: Story = {
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
    data: { assets: [1, 2, 3] },
  },
}

export const SortableArray: Story = {
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
      required: ["assets"],
    } satisfies JSONSchema,
    uiSchema: arrayControlSortableUISchema,
    data: { assets: [1, 2, 3] },
  },
}

export const SortableWithIconsArray: Story = {
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
      required: ["assets"],
    } satisfies JSONSchema,
    uiSchema: arrayControlSortableWithIconsUISchema,
    data: { assets: [1, 2, 3] },
  },
}

export const WithIconsArray: Story = {
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
      required: ["assets"],
    } satisfies JSONSchema,
    uiSchema: arrayControlUISchemaWithIcons,
    data: { assets: [1, 2, 3] },
  },
}

export const WithTooltip: Story = {
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
    uiSchema: arrayControlTooltipUISchema,
    data: { assets: [1, 2, 3] },
  },
}
