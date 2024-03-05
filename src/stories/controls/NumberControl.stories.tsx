import type { Meta, StoryObj } from "@storybook/react"
import { StorybookAntDJsonForm } from "../../common/StorybookAntDJsonForm";

import { 
  numberMagnitudeSchema, 
  numberTheNumberSchema,
  numberWeightSchema,
  numberPriceSchema,
  numberBasisPointsSchema,
  numberTemperatureSchema,
  numberHumiditySchema,
  numberRelativeChangeSchema,
  numberFinalGradeSchema,
  numberDonateNowSchema,
  numberMagnitudeUISchema,
  numberTheNumberUISchema,
  numberPriceUISchema,
  numberWeightUISchema,
  numberBasisPointsUISchema,
  numberTemperatureUISchema,
  numberPercentageUISchema,
  numberDonateNowUISchema,
} from "../../testSchemas/numberSchema"

const meta: Meta<typeof StorybookAntDJsonForm> = {
  title: "Control/Number",
  component: StorybookAntDJsonForm,
  tags: ["autodocs"],
  args: {
    uiSchema: numberMagnitudeUISchema,
  },
  argTypes: {
    uiSchema: {
      control: "object",
    },
  }
}

export default meta
type Story = StoryObj<typeof StorybookAntDJsonForm>

export const RequiredSingleFloatingPoint: Story = {
  tags: ["autodocs"],
  args: { 
    jsonSchema: numberMagnitudeSchema,
    uiSchema: numberMagnitudeUISchema,
  },
}

export const SingleFloatingPointWithDefault: Story = {
  tags: ["autodocs"],
  args: { 
    jsonSchema: numberTheNumberSchema,
    uiSchema: numberTheNumberUISchema,
  },
}

export const OptionalSingleFloatingPoint: Story = {
  tags: ["autodocs"],
  args: { 
    jsonSchema: numberWeightSchema,
    uiSchema: numberWeightUISchema,
  },
}

export const SingleFloatingPointWithSymbol: Story = {
  tags: ["autodocs"],
  args: { 
    jsonSchema: numberPriceSchema,
    uiSchema: numberPriceUISchema,
  },
}

export const SliderWithGreaterThan100Steps: Story = {
  tags: ["autodocs"],
  args: { 
    jsonSchema: numberBasisPointsSchema,
    uiSchema: numberBasisPointsUISchema,
  },
}

export const SliderWithDefaultAndGreaterThan100Steps: Story = {
  tags: ["autodocs"],
  args: { 
    jsonSchema: numberTemperatureSchema,
    uiSchema: numberTemperatureUISchema,
  },
}

export const PercentageSlider: Story = {
  tags: ["autodocs"],
  args: { 
    jsonSchema: numberHumiditySchema,
    uiSchema: numberPercentageUISchema,
  },
}

export const PercentageSliderWithGreaterThan100Steps: Story = {
  tags: ["autodocs"],
  args: { 
    jsonSchema: numberRelativeChangeSchema,
    uiSchema: numberPercentageUISchema,
  },
}

export const PercentageSliderWithDefault: Story = {
  tags: ["autodocs"],
  args: { 
    jsonSchema: numberFinalGradeSchema,
    uiSchema: numberPercentageUISchema,
  },
}

export const RequiredUSDSliderWithDefault: Story = {
  tags: ["autodocs"],
  args: { 
    jsonSchema: numberDonateNowSchema,
    uiSchema: numberDonateNowUISchema,
  },
}
