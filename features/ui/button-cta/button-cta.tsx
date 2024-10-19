import { ButtonHTMLAttributes } from "react";
import classNames from "classnames";
import styles from "./button-cta.module.scss";

export enum ButtonCTASize {
  Small = "sm",
  Medium = "md",
  Large = "lg",
  XLarge = "xl",
}

export enum ButtonCTAHierarchy {
  Primary = "primary",
  Secondary = "secondary",
  Gray = "gray",
  Empty = "empty",
  EmptyGray = "emptyGray",
  Error = "error",
  EmptyError = "emptyError",
}

export enum ButtonCTAIcon {
  Leading = "leading",
  Trailing = "trailing",
  Only = "only",
  None = "none",
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
  size?: ButtonCTASize;
  hierarchy?: ButtonCTAHierarchy;
  icon?: ButtonCTAIcon;
  className?: string;
};

export function ButtonCTA({
  size = ButtonCTASize.Medium,
  hierarchy = ButtonCTAHierarchy.Primary,
  icon = ButtonCTAIcon.None,
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
