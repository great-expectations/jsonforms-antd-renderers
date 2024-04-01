import { Meta, StoryObj } from "@storybook/react"
import { rendererRegistryEntries } from "../../renderer-registry-entries"
import { UISchema } from "../../ui-schema"
import { StorybookAntDJsonForm } from "../../common/StorybookAntDJsonForm"
import { JSONSchema } from "json-schema-to-ts"

const schema = {
  type: "object",
  properties: {
    deliveryOption: {
      title: "Delivery Option",
      oneOf: [
        {
          title: "Pickup",
          type: "object",
          properties: {
            time: { type: "string" },
            location: { type: "string" },
          },
        },
        {
          title: "Delivery",
          type: "object",
          properties: {
            address: { type: "string" },
            phone: { type: "string" },
          },
        },
      ] as const,
    },
  },
  // required: ["name"],
} satisfies JSONSchema

const metaUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/deliveryOption",
      // label: "Name",
    },
  ],
} satisfies UISchema<typeof schema>

const meta: Meta<typeof StorybookAntDJsonForm> = {
  title: "Control/OneOf",
  component: StorybookAntDJsonForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  args: {
    jsonSchema: schema,
    uiSchema: metaUISchema,
    rendererRegistryEntries: [...rendererRegistryEntries],
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    rendererRegistryEntries: { table: { disable: true } },
    jsonSchema: {
      control: "object",
      description: "this is a minimal oneOf combinator schema",
    },
    uiSchemaRegistryEntries: { table: { disable: true } },
    data: { table: { disable: true } },
    config: { control: "object" },
    onChange: { table: { disable: true, action: "on-change" } },
  },
}

export default meta
type Story = StoryObj<typeof StorybookAntDJsonForm>

const radioGroupUISchema = {
  type: "VerticalLayout",
  elements: [{ type: "Control", scope: "#/properties/deliveryOption" }],
} satisfies UISchema<typeof schema>

export const RadioGroup: Story = {
  parameters: { controls: { expanded: true } },
  tags: ["autodocs"],
  args: {
    jsonSchema: schema,
    uiSchema: radioGroupUISchema,
  },
  argTypes: {
    jsonSchema: {
      control: "object",
      description: "this is a minimal oneOf combinator schema",
    },
  },
}

const buttonUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/deliveryOption",
      options: { optionType: "button" },
    },
  ],
} satisfies UISchema<typeof schema>

export const Button: Story = {
  parameters: { controls: { expanded: true } },
  tags: ["autodocs"],
  args: {
    jsonSchema: schema,
    uiSchema: buttonUISchema,
  },
  argTypes: {
    jsonSchema: {
      control: "object",
      description: "this is a minimal oneOf combinator schema",
    },
  },
}

const dropdownUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/deliveryOption",
      options: { optionType: "dropdown" },
    },
  ],
} satisfies UISchema<typeof schema>

export const Dropdown: Story = {
  parameters: { controls: { expanded: true } },
  tags: ["autodocs"],
  args: {
    jsonSchema: schema,
    uiSchema: dropdownUISchema,
  },
  argTypes: {
    jsonSchema: {
      control: "object",
      description: "this is a minimal oneOf combinator schema",
    },
  },
}

const segmentedUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/deliveryOption",
      options: { optionType: "dropdown" },
    },
  ],
} satisfies UISchema<typeof schema>

export const Segmented: Story = {
  parameters: { controls: { expanded: true } },
  tags: ["autodocs"],
  args: {
    jsonSchema: schema,
    uiSchema: segmentedUISchema,
  },
  argTypes: {
    jsonSchema: {
      control: "object",
      description: "this is a minimal oneOf combinator schema",
    },
  },
}

const oneOfTitleUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      label: {
        type: "Title",
        text: "Titles are configurable with AntD Title Props",
        titleProps: { level: 5, delete: true, type: "danger" },
      },
      scope: "#/properties/deliveryOption",
      options: { optionType: "dropdown" },
    },
  ],
} satisfies UISchema<typeof schema>

export const OneOfTitleLabelStyling: Story = {
  parameters: { controls: { expanded: true } },
  tags: ["autodocs"],
  args: {
    jsonSchema: schema,
    uiSchema: oneOfTitleUISchema,
  },
  argTypes: {
    jsonSchema: {
      control: "object",
      description: "this is a minimal oneOf combinator schema",
    },
  },
}

const oneOfTextLabelStylingUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      label: {
        type: "Text",
        text: "Titles are configurable with AntD Title Props",
        textProps: { disabled: true, type: "secondary" },
      },
      scope: "#/properties/deliveryOption",
      options: { optionType: "dropdown" },
    },
  ],
} satisfies UISchema<typeof schema>

export const OneOfTextLabelStyling: Story = {
  parameters: { controls: { expanded: true } },
  tags: ["autodocs"],
  args: {
    jsonSchema: schema,
    uiSchema: oneOfTextLabelStylingUISchema,
  },
  argTypes: {
    jsonSchema: {
      control: "object",
      description: "this is a minimal oneOf combinator schema",
    },
  },
}
