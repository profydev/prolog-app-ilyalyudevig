import classNames from "classnames";
import styles from "./alert.module.scss";
type AlertProps = {
  className?: string;
  children: React.ReactNode;
};

export function Alert({ children, className }: AlertProps) {
  return (
    <div role="alert" className={classNames(styles.alert, className)}>
      {children}
    </div>
  );
}
