import classNames from "classnames";
import styles from "./input.module.scss";
import { ChangeEvent } from "react";
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  withIcon?: boolean;
  isError?: boolean;
  isDisabled?: boolean;
  hintMessage?: string;
  errorMessage?: string;
  placeholder?: string;
  className?: string;
  iconSrc?: string;
  value?: string;
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
};

export function Input({
  label,
  withIcon,
  isError,
  isDisabled,
  hintMessage,
  errorMessage,
  placeholder,
  className,
  iconSrc,
  value,
  onChange,
}: InputProps) {
  return (
    <div
      className={classNames(
        className,
        styles.container,
        isError && styles.error,
        isDisabled && styles.disabled,
      )}
    >
      {label && <p className={styles.label}>{label}</p>}
      <label id="text" />
      {withIcon && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img className={styles.icon} src={iconSrc} alt="icon" />
      )}
      <input
        className={styles.input}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {isError && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          className={styles.errorIcon}
          src="/icons/alert-circle.svg"
          alt="alert"
        />
      )}
      {isError ? (
        <p className={styles.errorMessage}>{errorMessage}</p>
      ) : (
        <p className={styles.hint}>{hintMessage}</p>
      )}
    </div>
  );
}
