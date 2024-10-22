import { ButtonCTA, Select, Input, ButtonCTASize } from "@features/ui";
import styles from "./filters-bar.module.scss";
import { useEffect, useState } from "react";
import { useFilters } from "../../hooks/use-filters";

export function FiltersBar() {
  const [statusFilter, setStatusFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [projectFilter, setProjectFilter] = useState("");

  const { handleFilters } = useFilters();

  useEffect(() => {
    handleFilters({
      status: statusFilter.toLowerCase(),
      level: levelFilter.toLowerCase(),
      project: projectFilter.toLowerCase(),
    });
  }, [statusFilter, levelFilter, projectFilter]);

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
        value={statusFilter}
        onChange={(value) => setStatusFilter(value)}
      />
      <Select
        className={styles.filter}
        options={["Info", "Warning", "Error", "All"]}
        placeholder="Level"
        value={levelFilter}
        onChange={(value) => setLevelFilter(value)}
      />
      <Input
        className={styles.search}
        placeholder="Project Name"
        withIcon={true}
        iconSrc="/icons/search.svg"
        alt="search"
        value={projectFilter}
        onChange={(e) => setProjectFilter(e.target.value)}
      />
    </div>
  );
}
