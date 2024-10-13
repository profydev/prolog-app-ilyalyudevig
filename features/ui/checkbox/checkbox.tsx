import React from "react";
import styles from "./checkbox.module.scss";
import classNames from "classnames";

export type CheckboxState = "unchecked" | "partially-checked" | "checked";
type CheckboxProps = {
  size: "small" | "large";
  state: CheckboxState;
  isDisabled?: boolean;
  label: string;
  onChange: (state: CheckboxState) => void;
};

export function Checkbox({
  size,
  state,
  label,
  isDisabled,
  onChange,
}: CheckboxProps) {
  const getIcon = () => {
    switch (state) {
      case "checked":
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={styles.icon}
            src={isDisabled ? "/icons/check-gray.svg" : "/icons/checkmark.svg"}
            alt="check"
          />
        );
      case "partially-checked":
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={styles.icon}
            src={isDisabled ? "/icons/minus-gray.svg" : "/icons/minus.svg"}
            alt="minus"
          />
        );
      default:
        return null;
    }
  };

  const handleClick = () => {
    if (isDisabled) return;

    let newState: CheckboxState;
    switch (state) {
      case "unchecked":
        newState = "checked";
        break;
      case "checked":
        newState = "partially-checked";
        break;
      default:
        newState = "unchecked";
    }

    onChange(newState);
  };

  return (
    <div
      className={classNames(styles.container, styles[state], {
        [styles.disabled]: isDisabled,
      })}
    >
      <div
        className={classNames(styles.box, styles[size], styles[state], {
          [styles.disabled]: isDisabled,
        })}
        onClick={handleClick}
        role="checkbox"
        aria-checked={state === "checked"}
        aria-label={label}
        tabIndex={isDisabled ? -1 : 0}
      >
        {getIcon()}
      </div>
      {label && <label className={styles.label}>{label}</label>}
    </div>
  );
}
