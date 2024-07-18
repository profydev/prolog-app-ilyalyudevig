import styles from "./alert.module.scss";

type AlertButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
};

export function AlertButton({ children, onClick }: AlertButtonProps) {
  return (
    <button className={styles.btn} onClick={onClick}>
      {children}
      <span className={styles.arrow}>→</span>
    </button>
  );
}
