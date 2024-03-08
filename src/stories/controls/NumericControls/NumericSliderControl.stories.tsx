import type { Meta, StoryObj } from "@storybook/react"
import { StorybookAntDJsonForm } from "../../../common/StorybookAntDJsonForm";

import {
  numericSliderBasisPointsSchema,
  numericSliderUISchema,
  numericSliderTemperatureSchema,
  numericSliderTemperatureUISchema,
  numericSliderFinalGradeSchema,
  numericSliderPercentageUISchema,
  numericSliderDonateNowSchema,
  numericSliderUSDUISchema,
} from "../../../testSchemas/numericSchema/numericSliderSchema";


const meta: Meta<typeof StorybookAntDJsonForm> = {
  title: "Control/Numeric Slider",
  component: StorybookAntDJsonForm,
  tags: ["autodocs"],
  args: {
    uiSchema: numericSliderUISchema,
  },
  argTypes: {
    uiSchema: {
      control: "object",
    },
  }
}

export default meta
type Story = StoryObj<typeof StorybookAntDJsonForm>

export const RequiredInteger: Story = {
  tags: ["autodocs"],
  args: { 
    jsonSchema: numericSliderBasisPointsSchema,
    uiSchema: numericSliderUISchema,
  },
}

export const RequiredIntegerWithUnits: Story = {
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
