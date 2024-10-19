import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import {
  ButtonCTA,
  ButtonCTASize,
  ButtonCTAHierarchy,
  ButtonCTAIcon,
} from "./button-cta";

export default {
  title: "UI/ButtonCTA",
  component: ButtonCTA,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as Meta<typeof ButtonCTA>;

const Template: StoryFn<typeof ButtonCTA> = ({
  label,
  size,
  hierarchy,
  icon,
  disabled,
}) => (
  <ButtonCTA size={size} hierarchy={hierarchy} icon={icon} disabled={disabled}>
    {label}
  </ButtonCTA>
);

export const Default = Template.bind({});

Default.args = {
  label: "Button CTA",
  size: ButtonCTASize.Medium,
  hierarchy: ButtonCTAHierarchy.Primary,
  icon: ButtonCTAIcon.None,
  disabled: false,
};
