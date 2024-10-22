import { useRouter } from "next/router";
import { useState } from "react";
import { ProjectLanguage } from "@api/projects.types";
import { useGetProjects } from "@features/projects";
import { useGetIssues } from "../../api/use-get-issues";
import { useFilters } from "../../hooks/use-filters";
import { IssueRow } from "./issue-row";
import {
  Loader,
  Alert,
  AlertButton,
  AlertImage,
  AlertMessage,
  Checkbox,
} from "@features/ui";
import { FiltersBar } from "../filters-bar";
import {
  Issue,
  IssueFilters,
  IssueLevel,
  IssueStatus,
} from "@api/issues.types";
import styles from "./issue-list.module.scss";

export function IssueList() {
  const router = useRouter();
  const page = Number(router.query.page || 1);
  const { filters } = useFilters();
  const navigateToPage = (newPage: number) =>
    router.push({
      pathname: router.pathname,
      query: { page: newPage, ...filters },
    });

  const newFilters = {
    ...filters,
    status:
      filters.status === "unresolved"
        ? "open"
        : filters.status === "resolved"
          ? "closed"
          : filters.status === "all"
            ? undefined
            : (filters.status as IssueStatus),

    level: filters.level === "all" ? undefined : (filters.level as IssueLevel),
  };

  const issuesPage = useGetIssues(page, newFilters as IssueFilters);
  const projects = useGetProjects();

  type CheckboxState = "checked" | "partially-checked" | "unchecked";
  const [checkBoxState, setCheckBoxState] =
    useState<CheckboxState>("unchecked");
  const handleClick = (state: CheckboxState) => {
    let newState: CheckboxState;
    switch (state) {
      case "unchecked":
        newState = "checked";
        break;
      case "checked":
        newState = "partially-checked";
        break;
      default:
        newState = "unchecked";
    }

    setCheckBoxState(newState);
  };

  if (projects.isLoading || issuesPage.isLoading) {
    return <Loader />;
  }

  if (projects.isError) {
    console.error(projects.error);
    return (
      <Alert>
        <AlertImage src="/icons/alert-circle.svg" />
        <AlertMessage>
          There was a problem while loading the projects data
        </AlertMessage>
        <AlertButton onClick={projects.refetch}>Try again</AlertButton>
      </Alert>
    );
  }

  if (issuesPage.isError) {
    console.error(issuesPage.error);
    return (
      <Alert>
        <AlertImage src="/icons/alert-circle.svg" />
        <AlertMessage>
          There was a problem while loading the issues data
        </AlertMessage>
        <AlertButton onClick={issuesPage.refetch}>Try again</AlertButton>
      </Alert>
    );
  }

  const projectIdToLanguage = (projects.data || []).reduce(
    (prev, project) => ({
      ...prev,
      [project.id]: project.language,
    }),
    {} as Record<string, ProjectLanguage>,
  );

  const { items, meta } = issuesPage.data || {};

  return (
    <>
      <FiltersBar />
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.headerRow}>
              <th className={styles.headerCell}>
                <Checkbox
                  size="small"
                  state={checkBoxState}
                  label="Issue"
                  onChange={handleClick}
                />
              </th>
              <th className={styles.headerCell}>Level</th>
              <th className={styles.headerCell}>Events</th>
              <th className={styles.headerCell}>Users</th>
            </tr>
          </thead>
          <tbody>
            {(items || []).map((issue: Issue) => (
              <IssueRow
                key={issue.id}
                issue={issue}
                projectLanguage={projectIdToLanguage[issue.projectId]}
              />
            ))}
          </tbody>
        </table>
        <div className={styles.paginationContainer}>
          <div>
            <button
              className={styles.paginationButton}
              onClick={() => navigateToPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              className={styles.paginationButton}
              onClick={() => navigateToPage(page + 1)}
              disabled={page === meta?.totalPages}
            >
              Next
            </button>
          </div>
          <div className={styles.pageInfo}>
            Page <span className={styles.pageNumber}>{meta?.currentPage}</span>{" "}
            of <span className={styles.pageNumber}>{meta?.totalPages}</span>
          </div>
        </div>
      </div>
    </>
  );
}
