import styles from "./select.module.scss";
import React, { useState } from "react";
import classNames from "classnames";

type SelectProps = {
  label?: string;
  options: string[];
  withIcon?: boolean;
  hint?: string;
  errorMessage?: string;
  isDisabled?: boolean;
  isError?: boolean;
  placeholder?: string;
  className?: string;
  value?: string | string[] | undefined;
  onChange: (value: string) => void;
};

export function Select({
  options,
  label,
  withIcon,
  hint,
  errorMessage,
  isDisabled,
  isError,
  placeholder,
  className,
  value,
  onChange,
  ...props
}: SelectProps) {
  const [selectedValue, setSelectedValue] = useState(value || placeholder);
  const [isOpen, setIsOpen] = useState(false);
  const [isEmptyState, setIsEmptyState] = useState(true);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (value: string) => {
    if (isDisabled) return;
    setSelectedValue(value);
    onChange(value);
    setIsEmptyState(false);
    setIsOpen(false);
  };

  return (
    <div
      className={classNames(
        className,
        styles.dropdown,
        isDisabled ? styles.disabled : "",
        isError ? styles.error : "",
      )}
      data-testid="dropdown"
    >
      {label && (
        <label htmlFor="dropdown" className={styles.label}>
          {label}
        </label>
      )}
      <button
        onClick={toggleDropdown}
        disabled={isDisabled}
        className={isEmptyState ? styles.empty : ""}
        {...props}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {withIcon && <img src="/icons/user.svg" alt="user" />}
        {selectedValue}
        {isOpen ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/icons/chevron-up.svg"
            alt="chevron-up"
            className={styles.chevron}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/icons/chevron-down.svg"
            alt="chevron-down"
            className={styles.chevron}
          />
        )}
      </button>
      {isOpen && (
        <ul>
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className={classNames(
                styles.option,
                selectedValue === option ? styles.selected : "",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {withIcon && <img src="/icons/user.svg" alt="user" />}
              {option}
              {selectedValue === option && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src="/icons/checkmark.svg"
                  alt="checkmark"
                  className={styles.checkmark}
                />
              )}
            </li>
          ))}
        </ul>
      )}
      {isError ? (
        <p className={styles.errorMessage}>{errorMessage}</p>
      ) : hint ? (
        <p className={styles.hint}>{hint}</p>
      ) : null}
    </div>
  );
}
