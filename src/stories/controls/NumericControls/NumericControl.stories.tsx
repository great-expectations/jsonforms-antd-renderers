import type { Meta, StoryObj } from "@storybook/react"
import { StorybookAntDJsonForm } from "../../../common/StorybookAntDJsonForm"

import {
  numericMagnitudeSchema,
  numericTheNumberSchema,
  numericWeightSchema,
  numericSheepSchema,
  numericUISchema,
  numericPriceSchema,
  numericUSDUISchema,
  numericROISchema,
  numericPercentageUISchema,
} from "../../../testSchemas/numericSchema/numericSchema"

const meta: Meta<typeof StorybookAntDJsonForm> = {
  title: "Control/Numeric Input",
  component: StorybookAntDJsonForm,
  tags: ["autodocs"],
  args: {
    uiSchema: numericUISchema,
  },
  argTypes: {
    uiSchema: {
      control: "object",
    },
  },
}

export default meta
type Story = StoryObj<typeof StorybookAntDJsonForm>

export const RequiredFloatingPoint: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: numericMagnitudeSchema,
    uiSchema: numericUISchema,
  },
}

export const RequiredFloatingPointWithDefault: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: numericTheNumberSchema,
    uiSchema: numericUISchema,
  },
}

export const OptionalFloatingPoint: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: numericWeightSchema,
    uiSchema: numericUISchema,
  },
}

export const RequiredInteger: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: numericSheepSchema,
    uiSchema: numericUISchema,
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
