import type { Meta, StoryObj } from "@storybook/react"
import { StorybookAntDJsonForm } from "../../common/StorybookAntDJsonForm"

import {
  numericMagnitudeSchema,
  numericHorizontalUISchema,
} from "../../testSchemas/numericSchema"
import {
  numericSliderBasisPointsSchema,
  numericSliderHorizontalUISchema,
} from "../../testSchemas/numericSliderSchema"
import {
  horizontalAlignmentSchema,
  horizontalAlignmentUISchema,
} from "../../testSchemas/horizontalAlignmentSchema"

const meta: Meta<typeof StorybookAntDJsonForm> = {
  title: "Layout/Horizontal",
  component: StorybookAntDJsonForm,
  tags: ["autodocs"],
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

export const NumericInput: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: numericMagnitudeSchema,
    uiSchema: numericHorizontalUISchema,
  },
}

export const NumericSlider: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: numericSliderBasisPointsSchema,
    uiSchema: numericSliderHorizontalUISchema,
  },
}

export const MixedControlAlignment: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: horizontalAlignmentSchema,
    uiSchema: horizontalAlignmentUISchema,
    layout: "vertical",
  },
}
