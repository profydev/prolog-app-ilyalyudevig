import React from "react";
import styles from "./checkbox.module.scss";
import classNames from "classnames";

export type CheckboxState = "unchecked" | "checked" | "partially-checked";
type CheckboxProps = {
  size: "small" | "large";
  state: CheckboxState;
  isDisabled?: boolean;
  label?: string;
  className?: string;
  onChange: (state: CheckboxState) => void;
};

export function Checkbox({
  size,
  state,
  label,
  isDisabled,
  onChange,
  className,
}: CheckboxProps) {
  const getIcon = (state: CheckboxState) => {
    if (state === "checked") {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={styles.icon}
          src={isDisabled ? "/icons/check-gray.svg" : "/icons/checkmark.svg"}
          alt="check"
        />
      );
    } else if (state === "partially-checked") {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={styles.icon}
          src={isDisabled ? "/icons/minus-gray.svg" : "/icons/minus.svg"}
          alt="minus"
        />
      );
    } else {
      return null;
    }
  };

  const handleClick = () =>
    isDisabled || onChange(state === "checked" ? "unchecked" : "checked");

  return (
    <div
      className={classNames(className, styles.container, styles[state], {
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
        {getIcon(state)}
      </div>
      {label && <label className={styles.label}>{label}</label>}
    </div>
  );
}
