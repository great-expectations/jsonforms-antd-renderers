import { Meta, StoryObj } from "@storybook/react"
import { rendererRegistryEntries } from "../../renderer-registry-entries"
import { StorybookAntDJsonForm } from "../../common/StorybookAntDJsonForm"
import {
  SplitterUISchemaRegistryEntry,
  splitterAnyOfJsonSchema,
  AnyOfWithDefaultsBaseUISchema,
  AnyOfTooltipUISchema,
  AnyOfWithDefaultsSchema,
  AnyOfWithDefaultsUISchemaRegistryEntries,
} from "../../testSchemas/anyOfSchema"

const meta: Meta<typeof StorybookAntDJsonForm<typeof splitterAnyOfJsonSchema>> =
  {
    title: "Control/AnyOf",
    component: StorybookAntDJsonForm,
    parameters: {
      // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
      layout: "centered",
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    args: {
      jsonSchema: splitterAnyOfJsonSchema,
      uiSchema: {
        type: "VerticalLayout",
        elements: [
          {
            type: "Control",
            scope: "#/properties/splitter",
          },
        ],
      },
      rendererRegistryEntries: [...rendererRegistryEntries],
      uiSchemaRegistryEntries: [SplitterUISchemaRegistryEntry],
    },
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
      rendererRegistryEntries: { table: { disable: true } },
      jsonSchema: {
        control: "object",
        description: "this is a minimal anyOf combinator schema",
      },
      uiSchemaRegistryEntries: { table: { disable: true } },
      data: { table: { disable: true } },
      config: { control: "object" },
      onChange: { table: { disable: true, action: "on-change" } },
    },
  }

export default meta
type Story<T> = StoryObj<typeof StorybookAntDJsonForm<T>>

export const RadioGroup: Story<typeof splitterAnyOfJsonSchema> = {
  parameters: { controls: { expanded: true } },
  tags: ["autodocs"],
  args: {
    jsonSchema: splitterAnyOfJsonSchema,
    uiSchema: {
      type: "VerticalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/splitter",
          options: {
            subschemaTitleToLabelMap: {
              SplitterYear: "Year",
              SplitterYearAndMonthAndDay: "Year - Month - Day",
              SplitterYearAndMonth: "Year - Month",
            },
          },
        },
      ],
    },
  },
  argTypes: {
    jsonSchema: {
      control: "object",
      description: "this is a minimal anyOf combinator schema",
    },
  },
}

export const Button: Story<typeof splitterAnyOfJsonSchema> = {
  parameters: { controls: { expanded: true } },
  tags: ["autodocs"],
  args: {
    jsonSchema: splitterAnyOfJsonSchema,
    uiSchema: {
      type: "VerticalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/splitter",
          options: { optionType: "button" },
        },
      ],
    },
  },
  argTypes: {
    jsonSchema: {
      control: "object",
      description: "this is a minimal anyOf combinator schema",
    },
  },
}

export const Dropdown: Story<typeof splitterAnyOfJsonSchema> = {
  parameters: { controls: { expanded: true } },
  tags: ["autodocs"],
  args: {
    jsonSchema: splitterAnyOfJsonSchema,
    uiSchema: {
      type: "VerticalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/splitter",
          options: { optionType: "dropdown" },
        },
      ],
    },
  },
  argTypes: {
    jsonSchema: {
      control: "object",
      description: "this is a minimal anyOf combinator schema",
    },
  },
}

export const WithDefaultValues: Story<typeof AnyOfWithDefaultsSchema> = {
  parameters: { controls: { expanded: true } },
  tags: ["autodocs"],
  args: {
    jsonSchema: AnyOfWithDefaultsSchema,
    uiSchemaRegistryEntries: AnyOfWithDefaultsUISchemaRegistryEntries,
    uiSchema: AnyOfWithDefaultsBaseUISchema,
  },
  argTypes: { jsonSchema: { control: "object" } },
}

export const Tooltip: Story<typeof AnyOfWithDefaultsSchema> = {
  parameters: { controls: { expanded: true } },
  tags: ["autodocs"],
  args: {
    jsonSchema: AnyOfWithDefaultsSchema,
    uiSchemaRegistryEntries: AnyOfWithDefaultsUISchemaRegistryEntries,
    uiSchema: AnyOfTooltipUISchema,
  },
}
