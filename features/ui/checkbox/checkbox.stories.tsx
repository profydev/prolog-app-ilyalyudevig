import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Checkbox, CheckboxState } from "./checkbox";

export default {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as Meta<typeof Checkbox>;

const Template: StoryFn<typeof Checkbox> = ({ size, label, isDisabled }) => {
  const [checkboxState, setCheckboxState] =
    useState<CheckboxState>("unchecked");

  const handleChange = (newState: CheckboxState) => {
    setCheckboxState(newState);
    // Perform any other actions based on the new state
  };

  return (
    <>
      <div style={{ padding: 10 }}>
        <Checkbox
          size={size}
          state={checkboxState}
          label={label}
          isDisabled={isDisabled}
          onChange={handleChange}
        />
      </div>
      <div style={{ padding: 10 }}>
        <Checkbox
          size={size}
          state="unchecked"
          label={label}
          isDisabled={isDisabled}
          onChange={() => {}}
        />
      </div>
      <div style={{ padding: 10 }}>
        <Checkbox
          size={size}
          state="partially-checked"
          label={label}
          isDisabled={isDisabled}
          onChange={() => {}}
        />
      </div>
      <div style={{ padding: 10 }}>
        <Checkbox
          size={size}
          state="checked"
          label={label}
          isDisabled={isDisabled}
          onChange={() => {}}
        />
      </div>
    </>
  );
};

export const Default = Template.bind({});

Default.args = {
  size: "small",
  state: "unchecked",
  label: "Label",
  isDisabled: false,
  onChange: () => {},
};
