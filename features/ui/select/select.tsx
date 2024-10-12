import styles from "./select.module.scss";
import { useState } from "react";
import classNames from "classnames";

type SelectProps = {
  label?: string;
  options: string[];
  withIcon?: boolean;
  hint?: string;
  errorMessage?: string;
  isDisabled?: boolean;
  isError?: boolean;
};

export function Select({
  options,
  label,
  withIcon,
  hint,
  errorMessage,
  isDisabled,
  isError,
}: SelectProps) {
  const [selectedValue, setSelectedValue] = useState("Select team member");
  const [isOpen, setIsOpen] = useState(false);
  const [isEmptyState, setIsEmptyState] = useState(true);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (value: string) => {
    if (isDisabled) return;
    setSelectedValue(value);
    setIsEmptyState(false);
    setIsOpen(false);
  };

  return (
    <div
      className={classNames(
        styles.dropdown,
        isDisabled ? styles.disabled : "",
        isError ? styles.error : "",
      )}
      data-testid="dropdown"
    >
      <label htmlFor="dropdown" className={styles.label}>
        {label}
      </label>
      <button
        onClick={toggleDropdown}
        disabled={isDisabled}
        className={isEmptyState ? styles.empty : ""}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {withIcon && <img src="/icons/user.svg" alt="user" />}
        {selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1)}
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
