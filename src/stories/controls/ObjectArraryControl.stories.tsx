import type { Meta, StoryObj } from "@storybook/react"

import { rendererRegistryEntries } from "../../renderers"
import { UISchema } from "../../ui-schema"
import { StorybookAntDJsonForm } from "../../common/StorybookAntDJsonForm"
import { PlusCircleTwoTone, DeleteOutlined } from "@ant-design/icons"
import React from "react"

const ObjectArrayControlUISchema: UISchema = {
  type: "VerticalLayout",
  elements: [
    {
      scope: "#/properties/assets",
      type: "Control",
    },
  ],
}

const schema = {
  title: "Assets",
  type: "object",
  properties: {
    assets: {
      type: "array",
      items: {
        type: "object",
        properties: {
          asset: {
            title: "Asset",
            type: "string",
          },
        },
      },
    },
  },
} satisfies JSONSchema

const meta: Meta<typeof StorybookAntDJsonForm> = {
  title: "Control/Object Array",
  component: StorybookAntDJsonForm,
  tags: ["autodocs"],
  args: {
    jsonSchema: schema,
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
    jsonSchema: schema,
    uiSchema: ObjectArrayControlUISchema,
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
    },
    uiSchema: {
      type: "VerticalLayout",
      elements: [
        {
          scope: "#/properties/options",
          type: "Control",
        },
      ],
    },
  },
}

export const ObjectArrayWithUiOptionAddButtonTop: Story = {
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
    },
    uiSchema: {
      type: "VerticalLayout",
      elements: [
        {
          scope: "#/properties/options",
          type: "Control",
          options: {
            addButtonLocation: "top",
          },
        },
      ],
    },
  },
}

export const ObjectArrayWithUiOptionForButtons: Story = {
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
    },
    uiSchema: {
      type: "VerticalLayout",
      elements: [
        {
          scope: "#/properties/options",
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
    },
  },
}

export const ObjectArrayWithUiOptionWithIcons: Story = {
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
    },
    uiSchema: {
      type: "VerticalLayout",
      elements: [
        {
          scope: "#/properties/options",
          type: "Control",
          options: {
            addButtonProps: {
              children: "Add more items",
              icon: <PlusCircleTwoTone />,
              type: "primary",
            },
            removeButtonProps: {
              children: "Destroy me!",
              icon: <DeleteOutlined />,
              danger: true,
              onClick: (e) => {}, // User should be unable to override the onClick event
            },
          },
        },
      ],
    },
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
    },
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
    },
  },
}
