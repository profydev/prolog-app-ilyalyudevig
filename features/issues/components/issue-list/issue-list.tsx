import { useRouter } from "next/router";
import { useState } from "react";
import { ProjectLanguage } from "@api/projects.types";
import { useGetProjects } from "@features/projects";
import { useGetIssues, useFilters, convertFilters } from "@features/issues";
import { IssueRow } from "./issue-row";
import { IssueCard } from "./issue-card";
import {
  Loader,
  Alert,
  AlertButton,
  AlertImage,
  AlertMessage,
  Checkbox,
  CheckboxState,
} from "@features/ui";
import { FiltersBar } from "../filters-bar";
import { Issue } from "@api/issues.types";
import styles from "./issue-list.module.scss";

export function IssueList() {
  const router = useRouter();
  const page = Number(router.query.page || 1);
  const { filters } = useFilters();

  const navigateToPage = (newPage: number) =>
    router.push(
      {
        pathname: router.pathname,
        query: { page: newPage, ...filters },
      },
      undefined,
      { shallow: true },
    );

  const newFilters = convertFilters(filters);

  const issuesPage = useGetIssues(page, newFilters);
  const projects = useGetProjects();

  const [headerCheckBoxState, setHeaderCheckBoxState] = useState(
    "unchecked" as CheckboxState,
  );

  const [allChecked, setAllChecked] = useState(false);
  const handleHeaderCheckboxChange = (newState: CheckboxState) => {
    setHeaderCheckBoxState(newState);
    setAllChecked(newState === "checked");
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
    <div className={styles.list}>
      <FiltersBar />
      <div className={styles.mobileContainer}>
        {(items || []).map((issue: Issue) => (
          <IssueCard
            key={issue.id}
            issue={issue}
            projectLanguage={projectIdToLanguage[issue.projectId]}
          />
        ))}
      </div>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.headerRow}>
              <th className={styles.headerCell}>
                <Checkbox
                  className={styles.headerCheckbox}
                  size="small"
                  state={headerCheckBoxState}
                  label="Issue"
                  onChange={handleHeaderCheckboxChange}
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
                allChecked={allChecked}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.paginationContainer}>
        <div className={styles.paginationButtons}>
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
          Page <span className={styles.pageNumber}>{meta?.currentPage}</span> of{" "}
          <span className={styles.pageNumber}>{meta?.totalPages}</span>
        </div>
      </div>
    </div>
  );
}
