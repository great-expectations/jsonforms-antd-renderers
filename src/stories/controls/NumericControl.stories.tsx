import type { Meta, StoryObj } from "@storybook/react"
import { StorybookAntDJsonForm } from "../../common/StorybookAntDJsonForm"

import {
  numericMagnitudeSchema,
  numericTheNumberSchema,
  numericWeightSchema,
  numericSheepSchema,
  numericVerticalUISchema,
  numericTooltipUISchema,
  numericPriceSchema,
  numericUSDUISchema,
  numericROISchema,
  numericPercentageUISchema,
} from "../../testSchemas/numericSchema"

const meta: Meta<typeof StorybookAntDJsonForm> = {
  title: "Control/Numeric Input",
  component: StorybookAntDJsonForm,
  tags: ["autodocs"],
  args: {
    uiSchema: numericVerticalUISchema,
  },
  argTypes: {
    rendererRegistryEntries: { table: { disable: true } },
    uiSchema: { control: "object" },
    layout: {},
    uiSchemaRegistryEntries: { table: { disable: true } },
    data: { table: { disable: true } },
    config: { control: "object" },
    onChange: { table: { disable: true, action: "on-change" } },
  },
}

export default meta
type Story = StoryObj<typeof StorybookAntDJsonForm>

export const RequiredFloatingPoint: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: numericMagnitudeSchema,
    uiSchema: numericVerticalUISchema,
  },
}

export const RequiredFloatingPointWithDefault: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: numericTheNumberSchema,
    uiSchema: numericVerticalUISchema,
  },
}

export const OptionalFloatingPoint: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: numericWeightSchema,
    uiSchema: numericVerticalUISchema,
  },
}

export const RequiredInteger: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: numericSheepSchema,
    uiSchema: numericVerticalUISchema,
  },
}

export const OptionalUSD: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: numericPriceSchema,
    uiSchema: numericUSDUISchema,
  },
}

export const RequiredPercentage: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: numericROISchema,
    uiSchema: numericPercentageUISchema,
  },
}

export const WithTooltip: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: numericSheepSchema,
    uiSchema: numericTooltipUISchema,
  },
}
