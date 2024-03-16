import type { Meta, StoryObj } from "@storybook/react"

import { rendererRegistryEntries } from "../../renderers"
import { JSONSchema } from "json-schema-to-ts"
import { UISchema } from "../../ui-schema"
import { StorybookAntDJsonForm } from "../../common/StorybookAntDJsonForm"
import {
  objectArrayControlJsonSchema,
  objectArrayControlUISchema,
  objectArrayControlUISchemaWithIcons,
} from "../../testSchemas/objectArraySchema"

const meta: Meta<typeof StorybookAntDJsonForm> = {
  title: "Control/Object Array",
  component: StorybookAntDJsonForm,
  tags: ["autodocs"],
  args: {
    jsonSchema: objectArrayControlJsonSchema,
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

export const ObjectArrayOfStrings: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: objectArrayControlJsonSchema,
    uiSchema: objectArrayControlUISchema,
  },
}

export const ObjectArrayOfBooleans: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: {
      type: "object",
      properties: {
        options: {
          type: "array",
          items: {
            type: "object",
            properties: {
              option: {
                title: "Option",
                type: "boolean",
              },
            },
          },
        },
      },
    } satisfies JSONSchema,
    uiSchema: {
      type: "VerticalLayout",
      elements: [
        {
          scope: "#/properties/options",
          type: "Control",
        },
      ],
    } satisfies UISchema,
  },
}

export const ObjectArrayWithUiOptionAddButtonTop: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: objectArrayControlJsonSchema,
    uiSchema: {
      type: "VerticalLayout",
      elements: [
        {
          scope: "#/properties/assets",
          type: "Control",
          options: {
            addButtonLocation: "top",
          },
        },
      ],
    } satisfies UISchema,
  },
}

export const ObjectArrayWithUiOptionForButtons: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: objectArrayControlJsonSchema,
    uiSchema: {
      type: "VerticalLayout",
      elements: [
        {
          scope: "#/properties/assets",
          type: "Control",
          options: {
            addButtonProps: {
              children: "Add more items",
              type: "primary",
            },
            removeButtonProps: {
              children: "Destory of my life!",
              danger: true,
            },
          },
        },
      ],
    } satisfies UISchema,
  },
}

export const ObjectArrayWithUiOptionWithIcons: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: objectArrayControlJsonSchema,
    uiSchema: objectArrayControlUISchemaWithIcons,
  },
}

export const ObjectArrayWithMultipleProperties: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: {
      type: "object",
      properties: {
        guest_list: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: {
                title: "name",
                type: "string",
              },
              gluten_free: {
                title: "gluten-free",
                type: "boolean",
              },
              vegan: {
                title: "vegan",
                type: "boolean",
              },
            },
          },
        },
      },
    } satisfies JSONSchema,
    uiSchema: {
      type: "VerticalLayout",
      elements: [
        {
          scope: "#/properties/guest_list",
          type: "Control",
          options: {
            addButtonProps: {
              children: "Add Guest",
              type: "primary",
            },
            removeButtonProps: {
              children: "Remove",
              danger: true,
            },
          },
        },
      ],
    } satisfies UISchema,
  },
}
