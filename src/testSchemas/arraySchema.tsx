import { JSONSchema } from "json-schema-to-ts"
import { UISchema } from "../ui-schema"
import { PlusCircleTwoTone, DeleteOutlined } from "@ant-design/icons"

export const arrayControlUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      scope: "#/properties/assets",
      type: "Control",
    },
  ],
} satisfies UISchema

export const arrayControlUISchemaWithIcons = {
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
    },
  ],
} satisfies UISchema

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

export const stringArrayControlJsonSchema = {
  title: "Assets",
  type: "object",
  properties: {
    assets: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
} satisfies JSONSchema

export const numberArrayControlJsonSchema = {
  title: "Assets",
  type: "object",
  properties: {
    assets: {
      type: "array",
      items: {
        type: "number",
      },
    },
  },
} satisfies JSONSchema

export const stringArrayControlJsonSchemaWithTitle = {
  title: "Assets",
  type: "object",
  properties: {
    assets: {
      type: "array",
      items: {
        type: "string",
        title: "Use this as the label",
      },
    },
  },
} satisfies JSONSchema

export const stringArrayControlJsonSchemaWithRequired = {
  title: "Assets",
  type: "object",
  properties: {
    assets: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
  required: ["assets"],
} satisfies JSONSchema
