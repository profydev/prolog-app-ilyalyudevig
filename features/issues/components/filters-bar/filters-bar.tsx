import { ButtonCTA, Select, Input, ButtonCTASize } from "@features/ui";
import styles from "./filters-bar.module.scss";
import { useEffect, useState } from "react";
import { useFilters } from "@features/issues";
import { Filters } from "@features/issues";

export function FiltersBar() {
  const { filters, handleFilters } = useFilters();

  const [statusFilter, setStatusFilter] = useState(filters.status);
  const [levelFilter, setLevelFilter] = useState(filters.level);
  const [projectFilter, setProjectFilter] = useState(filters.project);

  useEffect(() => {
    handleFilters({
      status: statusFilter,
      level: levelFilter,
      project: projectFilter,
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
        placeholder={"Status"}
        value={statusFilter}
        onChange={(value) =>
          setStatusFilter(value.toLowerCase() as Filters["status"])
        }
      />
      <Select
        className={styles.filter}
        options={["Info", "Warning", "Error", "All"]}
        placeholder="Level"
        value={levelFilter}
        onChange={(value) =>
          setLevelFilter(value.toLowerCase() as Filters["level"])
        }
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
