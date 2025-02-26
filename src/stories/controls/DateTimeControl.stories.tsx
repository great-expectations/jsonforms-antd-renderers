import { Meta, StoryObj } from "@storybook/react"
import { StorybookAntDJsonForm } from "../../common/StorybookAntDJsonForm"
import {
  dateTimeSchema,
  dateTimeShowTimeUISchema,
  dateTimeUISchema,
  dateTimeOverrideDefaultFormatUISchema,
  dateTimeShowMillisecondHideNowUISchema,
  dateTimeDefaultValueSchema,
} from "../../testSchemas/dateTimeSchema"

const meta: Meta<typeof StorybookAntDJsonForm> = {
  title: "Control/DateTime",
  component: StorybookAntDJsonForm,
  tags: ["autodocs"],
  args: {
    jsonSchema: dateTimeSchema,
    uiSchema: dateTimeUISchema,
  },
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof StorybookAntDJsonForm>

export const RequiredDatetime: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: dateTimeSchema,
    uiSchema: dateTimeUISchema,
  },
}

export const ShowTime: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: dateTimeSchema,
    uiSchema: dateTimeShowTimeUISchema,
  },
}

export const ShowMillisecondHideNow: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: dateTimeSchema,
    uiSchema: dateTimeShowMillisecondHideNowUISchema,
  },
}

export const OverrideDefaultFormat: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: dateTimeSchema,
    uiSchema: dateTimeOverrideDefaultFormatUISchema,
  },
}

export const DefaultValue: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: dateTimeDefaultValueSchema,
    uiSchema: dateTimeUISchema,
  },
}

export const ExistingValue: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: dateTimeSchema,
    uiSchema: dateTimeUISchema,
    data: {
      dateTime: "1999-12-31T23:59:59.999Z",
    },
  },
}
