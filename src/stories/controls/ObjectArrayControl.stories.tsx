import type { Meta, StoryObj } from "@storybook/react"

import { rendererRegistryEntries } from "../../renderer-registry-entries"
import { JSONSchema } from "json-schema-to-ts"
import { StorybookAntDJsonForm } from "../../common/StorybookAntDJsonForm"
import {
  objectArrayControlJsonSchema,
  arrayControlUISchema,
  arrayControlUISchemaWithIcons,
  arrayControlSortableWithIconsUISchema,
} from "../../testSchemas/arraySchema"
import { ComponentProps } from "react"

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
type Story<T> = StoryObj<ComponentProps<typeof StorybookAntDJsonForm<T>>>

export const ObjectArrayOfStrings: Story<typeof objectArrayControlJsonSchema> =
  {
    tags: ["autodocs"],
    args: {
      jsonSchema: objectArrayControlJsonSchema,
      uiSchema: arrayControlUISchema,
    },
  }

export const ObjectArrayWithUiOptionAddButtonTop: Story<
  typeof objectArrayControlJsonSchema
> = {
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
    },
  },
}

export const ObjectArrayWithUiOptionForButtons: Story<
  typeof objectArrayControlJsonSchema
> = {
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
    },
  },
}

const objectArrayControlJsonSchemaNumericInput = {
  type: "object",
  properties: {
    ages: {
      type: "array",
      items: {
        type: "object",
        properties: { age: { type: "number", title: "age" } },
      },
    },
  },
} satisfies JSONSchema

export const ObjectArrayWithNumericInput: Story<
  typeof objectArrayControlJsonSchemaNumericInput
> = {
  tags: ["autodocs"],
  args: {
    jsonSchema: objectArrayControlJsonSchemaNumericInput,
    uiSchema: {
      type: "VerticalLayout",
      elements: [
        {
          scope: "#/properties/ages",
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

export const ObjectArrayWithUiOptionWithIcons: Story<
  typeof objectArrayControlJsonSchema
> = {
  tags: ["autodocs"],
  args: {
    jsonSchema: objectArrayControlJsonSchema,
    uiSchema: arrayControlUISchemaWithIcons,
  },
}

const objectArrayMultiplePropertiesJsonSchema = {
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
} satisfies JSONSchema

export const ObjectArrayWithMultipleProperties: Story<
  typeof objectArrayMultiplePropertiesJsonSchema
> = {
  tags: ["autodocs"],
  args: {
    jsonSchema: objectArrayMultiplePropertiesJsonSchema,
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

export const SortableObjectArray: Story<typeof objectArrayControlJsonSchema> = {
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
            showSortButtons: true,
          },
        },
      ],
    },
    data: {
      assets: [{ name: "Asset 1" }, { name: "Asset 2" }, { name: "Asset 3" }],
    },
  },
}

export const SortableObjectArrayWithIconsFromSchema: Story<
  typeof objectArrayControlJsonSchema
> = {
  tags: ["autodocs"],
  args: {
    jsonSchema: objectArrayControlJsonSchema,
    uiSchema: arrayControlSortableWithIconsUISchema,
    data: {
      assets: [
        { asset: "Asset 1" },
        { asset: "Asset 2" },
        { asset: "Asset 3" },
      ],
    },
  },
}
