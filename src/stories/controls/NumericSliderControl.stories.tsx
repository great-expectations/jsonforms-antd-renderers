import type { Meta, StoryObj } from "@storybook/react"
import { StorybookAntDJsonForm } from "../../common/StorybookAntDJsonForm"

import {
  numericSliderBasisPointsSchema,
  numericSliderVerticalUISchema,
  numericSliderTemperatureSchema,
  numericSliderTemperatureUISchema,
  numericSliderFinalGradeSchema,
  numericSliderPercentageUISchema,
  numericSliderDonateNowSchema,
  numericSliderUSDUISchema,
} from "../../testSchemas/numericSliderSchema"

const meta: Meta<typeof StorybookAntDJsonForm> = {
  title: "Control/Numeric Slider",
  component: StorybookAntDJsonForm,
  tags: ["autodocs"],
  args: {
    uiSchema: numericSliderVerticalUISchema,
  },
  argTypes: {
    uiSchema: {
      control: "object",
    },
  },
}

export default meta
type Story = StoryObj<typeof StorybookAntDJsonForm>

export const RequiredInteger: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: numericSliderBasisPointsSchema,
    uiSchema: numericSliderVerticalUISchema,
  },
}

export const RequiredFloatingPointWithUnits: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: numericSliderTemperatureSchema,
    uiSchema: numericSliderTemperatureUISchema,
  },
}

export const RequiredPercentageWithDefault: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: numericSliderFinalGradeSchema,
    uiSchema: numericSliderPercentageUISchema,
  },
}

export const OptionalUSDWithDefault: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: numericSliderDonateNowSchema,
    uiSchema: numericSliderUSDUISchema,
  },
}
