import React from "react";
import { Meta, StoryFn } from "@storybook/react";

import { Alert } from "./alert";

export default {
  title: "UI/Alert",
  component: Alert,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as Meta<typeof Alert>;

const Template: StoryFn<typeof Alert> = () => <Alert />;

export const Default = Template.bind({});
