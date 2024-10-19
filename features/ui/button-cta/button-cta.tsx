import { ButtonHTMLAttributes } from "react";
import classNames from "classnames";
import styles from "./button-cta.module.scss";

export enum ButtonCTASize {
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
}

export enum ButtonCTAHierarchy {
  primary = "primary",
  secondary = "secondary",
  gray = "gray",
  empty = "empty",
  emptyGray = "emptyGray",
  error = "error",
  emptyError = "emptyError",
}

export enum ButtonCTAIcon {
  leading = "leading",
  trailing = "trailing",
  only = "only",
  none = "none",
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
  size?: ButtonCTASize;
  hierarchy?: ButtonCTAHierarchy;
  icon?: ButtonCTAIcon;
  className?: string;
};

export function ButtonCTA({
  size = ButtonCTASize.md,
  hierarchy = ButtonCTAHierarchy.primary,
  icon = ButtonCTAIcon.none,
  className,
  ...props
}: ButtonProps) {
  const circleIcon = (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img className={styles.icon} src="/icons/circle.svg" alt="circle" />
  );

  return (
    <button
      {...props}
      className={classNames(
        styles.button,
        styles[size],
        styles[hierarchy],
        styles[icon],
        className,
      )}
      type="button"
    >
      {icon === "leading" && circleIcon}
      {icon === "only" && circleIcon}
      {icon !== "only" && props.children}
      {icon === "trailing" && circleIcon}
    </button>
  );
}
