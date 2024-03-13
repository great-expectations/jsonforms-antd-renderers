import type { Meta, StoryObj } from "@storybook/react";

import { rendererRegistryEntries } from "../../renderers";
import { UISchema } from "../../ui-schema";
import { StorybookAntDJsonForm } from "../../common/StorybookAntDJsonForm";

const PrimitiveArrayControlUISchema: UISchema = {
  type: "VerticalLayout",
  elements: [
    {
      scope: "#/properties/pokemon",
      type: "Control",
    },
  ],
};

const schema = {
  type: "object",
  properties: {
    pokemon: {
      title: "Pokémon",
      type: "array",
      items: {
        type: "number",
      },
    },
  },
};

const meta: Meta<typeof StorybookAntDJsonForm> = {
  title: "Control/Primitive Array",
  component: StorybookAntDJsonForm,
  tags: ["autodocs"],
  args: {
    jsonSchema: schema,
    rendererRegistryEntries: [...rendererRegistryEntries],
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    rendererRegistryEntries: { table: { disable: true } },
    jsonSchema: {
      control: "object",
    },
    uiSchemaRegistryEntries: { table: { disable: true } },
    data: { table: { disable: true } },
    config: { control: "object" },
    onChange: { table: { disable: true, action: "on-change" } },
  },
};

export default meta;
type Story = StoryObj<typeof StorybookAntDJsonForm>;

export const PrimitiveArrayOfNumbers: Story = {
  tags: ["autodocs"],
  args: {
    jsonSchema: schema,
    uiSchema: PrimitiveArrayControlUISchema,
  },
};
