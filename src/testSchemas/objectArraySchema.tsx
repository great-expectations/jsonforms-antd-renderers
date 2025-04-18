import { JSONSchema } from "json-schema-to-ts"
import { UISchema } from "../ui-schema"
import {
  PlusCircleTwoTone,
  DeleteOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons"

export const objectArrayControlUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      scope: "#/properties/assets",
      type: "Control",
      layoutProps: {
        columns: undefined,
      },
    },
  ],
} satisfies UISchema<typeof objectArrayControlJsonSchema>

export const objectArrayControlJsonSchema = {
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

export const objectArrayControlJsonSchemaWithRequired = {
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
  required: ["assets"],
} satisfies JSONSchema

export const objectArrayControlUISchemaWithIcons = {
  type: "VerticalLayout",
  elements: [
    {
      scope: "#/properties/assets",
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
          onClick: () => {}, // User should be unable to override the onClick event
        },
      },
      layoutProps: {
        columns: undefined,
      },
    },
  ],
} satisfies UISchema<typeof objectArrayControlJsonSchemaWithRequired>

export const objectArrayControlSortableUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      scope: "#/properties/assets",
      type: "Control",
      options: {
        showSortButtons: true,
      },
      layoutProps: {
        columns: undefined,
      },
    },
  ],
} satisfies UISchema<typeof objectArrayControlJsonSchema>

export const objectArrayControlSortableWithIconsUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      scope: "#/properties/assets",
      type: "Control",
      options: {
        showSortButtons: true,
        moveUpButtonProps: {
          icon: <ArrowUpOutlined />,
          onClick: () => {},
        },
        moveDownButtonProps: {
          icon: <ArrowDownOutlined />,
          onClick: () => {},
        },
      },
      layoutProps: {
        columns: undefined,
      },
    },
  ],
} satisfies UISchema<typeof objectArrayControlJsonSchema>
