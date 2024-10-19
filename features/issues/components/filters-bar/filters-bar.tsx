import { ButtonCTA, Select, Input, ButtonCTASize } from "@features/ui";
import styles from "./filters-bar.module.scss";

export function FiltersBar() {
  return (
    <div className={styles.container}>
      <ButtonCTA className={styles.button} size={ButtonCTASize.Medium}>
        {/*eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.icon} src="/icons/white-check.svg" alt="check" />
        Resolve selected issues
      </ButtonCTA>
      <Select
        className={styles.filter}
        options={["Resolved", "Unresolved", "All"]}
        placeholder="Status"
      />
      <Select
        className={styles.filter}
        options={["Open", "Closed", "All"]}
        placeholder="Level"
      />
      <Input
        className={styles.search}
        placeholder="Project Name"
        withIcon={true}
        iconSrc="/icons/search.svg"
        alt="search"
      />
    </div>
  );
}
