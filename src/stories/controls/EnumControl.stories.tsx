import { Meta, StoryObj } from "@storybook/react"
import { StorybookAntDJsonForm } from "../../common/StorybookAntDJsonForm"
import {
  enumPSISchema,
  enumPSIUISchema,
  enumProfessionSchema,
  enumProfessionUISchema,
  enumSizeSchema,
  enumSizeUISchema,
} from "../../testSchemas/enumSchema"

const meta: Meta<typeof StorybookAntDJsonForm> = {
  title: "Control/Enum",
  component: StorybookAntDJsonForm,
  tags: ["autodocs"],
  args: {
    jsonSchema: enumProfessionSchema,
    uiSchema: enumProfessionUISchema,
  },
  argTypes: {
    uiSchema: {
      control: "object",
    },
  },
}

export default meta
type Story = StoryObj<typeof StorybookAntDJsonForm>

export const RequiredDropdown: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: enumProfessionSchema,
    uiSchema: enumProfessionUISchema,
  },
}

export const SegmentedWithDefault: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: enumSizeSchema,
    uiSchema: enumSizeUISchema,
  },
}

export const Radio: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: enumPSISchema,
    uiSchema: enumPSIUISchema,
  },
}
