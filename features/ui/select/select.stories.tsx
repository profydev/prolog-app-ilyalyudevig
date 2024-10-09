import type { Meta, StoryFn } from "@storybook/react";

import { Select } from "./select";

export default {
  title: "UI/Select",
  component: Select,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as Meta<typeof Select>;

const Template: StoryFn<typeof Select> = (args) => {
  return (
    <div style={{ padding: 10 }}>
      <Select {...args} />
    </div>
  );
};

export const Default = Template.bind({});
export const WithIcon = Template.bind({});

const mockTeamMembers = [
  "Emily Chen",
  "Liam Reed",
  "Ava Morales",
  "Ethan Patel",
  "Sophia Rodriguez",
  "Jackson Lee",
  "Mia Kim",
  "Logan Brooks",
  "Isabella Martin",
  "Julian Sanchez",
];

Default.args = {
  options: mockTeamMembers,
  withIcon: false,
};

WithIcon.args = {
  options: mockTeamMembers,
  withIcon: true,
};
