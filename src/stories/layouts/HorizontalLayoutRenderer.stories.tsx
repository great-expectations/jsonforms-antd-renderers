import type { Meta, StoryObj } from "@storybook/react"
import { StorybookAntDJsonForm } from "../../common/StorybookAntDJsonForm"

import {
  numericMagnitudeSchema,
  numericHorizontalUISchema,
} from "../../testSchemas/numericSchema/numericSchema"

const meta: Meta<typeof StorybookAntDJsonForm> = {
  title: "Layout/Horizontal",
  component: StorybookAntDJsonForm,
  tags: ["autodocs"],
  args: {
    uiSchema: numericHorizontalUISchema,
  },
  argTypes: {
    uiSchema: {
      control: "object",
    },
  },
}

export default meta
type Story = StoryObj<typeof StorybookAntDJsonForm>

export const NumericControl: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: numericMagnitudeSchema,
    uiSchema: numericHorizontalUISchema,
  },
}