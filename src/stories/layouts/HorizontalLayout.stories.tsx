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
