import type { Meta, StoryFn } from "@storybook/react";
import { Input } from "./input";

export default {
  title: "UI/Input",
  component: Input,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = (args) => {
  return (
    <div style={{ padding: 10 }}>
      <Input {...args} />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  label: "",
  withIcon: false,
  isError: false,
  isDisabled: false,
  hintMessage: "",
  errorMessage: "",
  iconSrc: "/icons/mail.svg",
};
