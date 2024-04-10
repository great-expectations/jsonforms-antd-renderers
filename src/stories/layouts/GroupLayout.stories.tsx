import { Meta, StoryObj } from "@storybook/react"
import { rendererRegistryEntries } from "../../renderer-registry-entries"
import { UISchema } from "../../ui-schema"
import { StorybookAntDJsonForm } from "../../common/StorybookAntDJsonForm"
import { JSONSchema } from "json-schema-to-ts"

const reindeerSchema = {
  type: "object",
  properties: {
    dancer: { type: "string", title: "Dancer" },
    prancer: { type: "string", title: "Prancer" },
    comet: { type: "string", title: "Comet" },
    rudolph: { type: "string", title: "Rudolph" },
  },
} satisfies JSONSchema

const addressSchema = {
  type: "object",
  properties: {
    address: { type: "string", title: "Address" },
    city: { type: "string", title: "City" },
    state: { type: "string", title: "State" },
    zip: { type: "string", title: "Zip" },
  },
} satisfies JSONSchema

const meta: Meta<typeof StorybookAntDJsonForm> = {
  title: "Layout/Group",
  component: StorybookAntDJsonForm,
  tags: ["autodocs"],
  args: {
    jsonSchema: reindeerSchema,
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
type Story<T> = StoryObj<typeof StorybookAntDJsonForm<T>>

export const Divider: Story<typeof reindeerSchema> = {
  tags: ["autodocs"],
  args: {
    jsonSchema: reindeerSchema,
    uiSchema: {
      type: "VerticalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/dancer",
        },
        {
          type: "Control",
          scope: "#/properties/prancer",
        },
        {
          type: "Control",
          scope: "#/properties/comet",
        },
        {
          type: "Group",
          elements: [
            {
              type: "Control",
              scope: "#/properties/rudolph",
            },
          ],
        },
      ],
    } satisfies UISchema<typeof reindeerSchema>,
  },
}

export const DividerWithCustomStyles: Story<typeof reindeerSchema> = {
  tags: ["autodocs"],
  args: {
    jsonSchema: reindeerSchema,
    uiSchema: {
      type: "VerticalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/dancer",
        },
        {
          type: "Control",
          scope: "#/properties/prancer",
        },
        {
          type: "Control",
          scope: "#/properties/comet",
        },
        {
          type: "Group",
          groupType: "Divider",
          bottomDividerProps: {
            dashed: true,
            style: { borderColor: "green", borderWidth: "3px" },
          },
          topDividerProps: {
            dashed: true,
            style: { borderColor: "red", borderWidth: "3px" },
          },
          elements: [
            {
              type: "Control",
              scope: "#/properties/rudolph",
            },
          ],
        },
      ],
    } satisfies UISchema<typeof reindeerSchema>,
  },
}

export const Card: Story<typeof addressSchema> = {
  tags: ["autodocs"],
  args: {
    jsonSchema: addressSchema,
    uiSchema: {
      type: "VerticalLayout",
      elements: [
        {
          type: "Group",
          groupType: "Card",
          cardProps: { title: "Billing Address", hoverable: true },
          elements: [
            {
              type: "Control",
              scope: "#/properties/address",
            },
            {
              type: "Control",
              scope: "#/properties/city",
            },
            {
              type: "Control",
              scope: "#/properties/state",
            },
            {
              type: "Control",
              scope: "#/properties/zip",
            },
          ],
        },
      ],
    } satisfies UISchema<typeof addressSchema>,
  },
}
