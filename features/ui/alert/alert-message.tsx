import styles from "./alert.module.scss";

type AlertMessageProps = {
  children: React.ReactNode;
};

export function AlertMessage({ children }: AlertMessageProps) {
  return <p className={styles.text}>{children}</p>;
}
