import styles from "./project-alert.module.scss";

export function ProjectAlert() {
  return (
    <div className={styles.alert}>
      <div className={styles.content}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/alert-circle.svg" alt="alert" />
        <p className={styles.text}>
          There was a problem while loading the projects data
        </p>
      </div>
      <button className={styles.btn} onClick={() => window.location.reload()}>
        Try again
        <span className={styles.arrow}>→</span>
      </button>
    </div>
  );
}
