import { JSONSchema } from "json-schema-to-ts"
import { ControlUISchema, UISchema } from "../ui-schema"
import { PlusCircleTwoTone, DeleteOutlined } from "@ant-design/icons"
import {
  JsonFormsUISchemaRegistryEntry,
  UISchemaElement,
} from "@jsonforms/core"

export const arrayControlUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      scope: "#/properties/assets",
      type: "Control",
      options: {
        showSortButtons: true,
      }
    },
  ],
} satisfies UISchema<typeof objectArrayControlJsonSchema>

export const arrayControlTooltipUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      scope: "#/properties/assets",
      type: "Control",
      formItemProps: {
        tooltip: "Items of value",
      },
    },
  ],
} satisfies UISchema<typeof objectArrayControlJsonSchema>

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

export const arrayInsideCombinatorSchema = {
  type: "object",
  properties: {
    list: {
      title: "My List",
      oneOf: [
        {
          title: "Text",
          type: "array",
          items: {
            type: "string",
          },
          minItems: 1,
        },
        {
          title: "Numbers",
          type: "array",
          items: {
            type: "number",
          },
          minItems: 1,
        },
      ],
    },
  },
} satisfies JSONSchema

export const objectArrayWithCombinatorSchema = {
  type: "object",
  properties: {
    list: {
      title: "List",
      type: "array",
      items: {
        oneOf: [
          {
            $ref: "#/definitions/FavoriteThing1",
          },
          {
            $ref: "#/definitions/FavoriteThing2",
          },
        ],
      },
    },
  },
  definitions: {
    FavoriteThing1: {
      title: "FavoriteThing1",
      type: "object",
      properties: {
        brownCopperKettle: {
          title: "Brown Copper Kettle",
          type: "string",
        },
      },
    },
    FavoriteThing2: {
      title: "FavoriteThing2",
      type: "object",
      properties: {
        warmWoolenMittens: {
          title: "Warm Woolen Mittens",
          type: "string",
        },
      },
    },
  },
} satisfies JSONSchema

const objectArrayWithCombinatorUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      scope: "#/properties/brownCopperKettle",
      label: "Brown Copper Kettle",
      type: "Control",
    },
  ],
} satisfies UISchema<
  typeof objectArrayWithCombinatorSchema.definitions.FavoriteThing1
>

export const objectArrayWithCombinator_FavoriteThing1UISchemaRegistryEntry: JsonFormsUISchemaRegistryEntry =
  {
    tester: (schema, schemaPath) =>
      schema.title === "FavoriteThing1" && schemaPath === "#" ? 2 : -1,
    uischema: objectArrayWithCombinatorUISchema,
  }

export const objectArrayWithCombinator_CombinatorUISchemaRegistryEntry: JsonFormsUISchemaRegistryEntry =
  {
    tester: (schema, _schemaPath, path) => {
      const pathElements = path.split(".")
      const length = pathElements.length
      const lastElement = pathElements[length - 1]
      if (typeof Number(lastElement) === "number" && schema.oneOf) {
        return 100
      }
      return -1
    },
    uischema: {
      type: "Control",
      scope: "#",
      options: {
        optionType: "segmented",
        subschemaTitleToLabelMap: {
          FavoriteThing1: "Favorite Thing 1",
          FavoriteThing2: "Favorite Thing 2",
        },
      },
    } satisfies ControlUISchema<{ oneOf: [] }> as UISchemaElement,
  }
