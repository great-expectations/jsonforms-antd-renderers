import type { Meta, StoryObj } from '@storybook/react';
import { FakeControl } from './FakeControl';


const meta: Meta<typeof FakeControl> = {
  component: FakeControl,
};

export default meta;
type Story = StoryObj<typeof FakeControl>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {};