import type { Preview } from "@storybook/react"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  argTypes: {
    layout: {
      control: "select",
      options: ["horizontal", "vertical", "inline"],
    },
  },
}

export default preview
