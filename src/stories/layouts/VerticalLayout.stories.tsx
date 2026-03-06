import type { Meta, StoryObj } from "@storybook/react"
import { StorybookAntDJsonForm } from "../../common/StorybookAntDJsonForm"

import {
  numericMagnitudeSchema,
  numericVerticalUISchema,
} from "../../testSchemas/numericSchema"
import {
  numericSliderBasisPointsSchema,
  numericSliderVerticalUISchema,
} from "../../testSchemas/numericSliderSchema"

const meta: Meta<typeof StorybookAntDJsonForm> = {
  title: "Layout/Vertical",
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
    uiSchema: numericVerticalUISchema,
  },
}

export const NumericSlider: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: numericSliderBasisPointsSchema,
    uiSchema: numericSliderVerticalUISchema,
  },
}
