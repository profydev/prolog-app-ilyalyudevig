import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Alert } from "./alert";
import { AlertButton } from "./alert-button";
import { AlertImage } from "./alert-image";
import { AlertMessage } from "./alert-message";

export default {
  title: "UI/Alert",
  component: Alert,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as Meta<typeof Alert>;

const Template: StoryFn<typeof Alert> = () => (
  <Alert>
    <AlertImage src="/icons/alert-circle.svg" />
    <AlertMessage>
      There was a problem while loading the projects data
    </AlertMessage>
    <AlertButton onClick={() => window.location.reload()}>
      Try again
    </AlertButton>
  </Alert>
);

export const Default = Template.bind({});
