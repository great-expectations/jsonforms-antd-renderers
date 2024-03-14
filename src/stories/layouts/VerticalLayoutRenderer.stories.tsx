import type { Meta, StoryObj } from "@storybook/react"
import { StorybookAntDJsonForm } from "../../common/StorybookAntDJsonForm"

import {
  numericMagnitudeSchema,
  numericVerticalUISchema,
} from "../../testSchemas/numericSchema/numericSchema"

const meta: Meta<typeof StorybookAntDJsonForm> = {
  title: "Layout/Vertical",
  component: StorybookAntDJsonForm,
  tags: ["autodocs"],
  args: {
    uiSchema: numericVerticalUISchema,
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
    uiSchema: numericVerticalUISchema,
  },
}
