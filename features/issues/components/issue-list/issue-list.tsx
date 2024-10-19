import { useRouter } from "next/router";
import { ProjectLanguage } from "@api/projects.types";
import { useGetProjects } from "@features/projects";
import { useGetIssues } from "../../api/use-get-issues";
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
import styles from "./issue-list.module.scss";

export function IssueList() {
  const router = useRouter();
  const page = Number(router.query.page || 1);
  const navigateToPage = (newPage: number) =>
    router.push({
      pathname: router.pathname,
      query: { page: newPage },
    });

  const issuesPage = useGetIssues(page);
  const projects = useGetProjects();

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
                  state="unchecked"
                  label="Issue"
                  onChange={(e) => {
                    console.log(e);
                  }}
                />
              </th>
              <th className={styles.headerCell}>Level</th>
              <th className={styles.headerCell}>Events</th>
              <th className={styles.headerCell}>Users</th>
            </tr>
          </thead>
          <tbody>
            {(items || []).map((issue) => (
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
