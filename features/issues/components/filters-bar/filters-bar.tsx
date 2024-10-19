import { ButtonCTA, Select, Input, ButtonCTASize } from "@features/ui";
import styles from "./filters-bar.module.scss";
import { ButtonCTAIcon } from "@features/ui";

export function FiltersBar() {
  return (
    <div className={styles.container}>
      <ButtonCTA
        className={styles.button}
        icon={ButtonCTAIcon.leading}
        size={ButtonCTASize.md}
      >
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
      />
    </div>
  );
}
