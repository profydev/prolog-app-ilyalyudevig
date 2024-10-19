import classNames from "classnames";
import styles from "./input.module.scss";
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  withIcon?: boolean;
  isError?: boolean;
  isDisabled?: boolean;
  hintMessage?: string;
  errorMessage?: string;
  placeholder?: string;
  className?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange?: (e: React.FormEvent<HTMLFormElement>) => void;
};

export function Input({
  label,
  withIcon,
  isError,
  isDisabled,
  hintMessage,
  errorMessage,
  onSubmit,
  onChange,
  placeholder,
  className,
  value,
}: InputProps) {
  return (
    <>
      {label && <p className={styles.label}>{label}</p>}
      <form
        onSubmit={onSubmit}
        className={classNames(
          className,
          styles.container,
          isError && styles.error,
          isDisabled && styles.disabled,
        )}
      >
        <label id="text" />
        {withIcon && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img className={styles.icon} src="/icons/mail.svg" alt="mail" />
        )}
        <input
          className={styles.input}
          type="text"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
        {isError && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            className={styles.icon}
            src="/icons/alert-circle.svg"
            alt="alert"
          />
        )}
      </form>
      {isError ? (
        <p className={styles.errorMessage}>{errorMessage}</p>
      ) : (
        <p className={styles.hint}>{hintMessage}</p>
      )}
    </>
  );
}
