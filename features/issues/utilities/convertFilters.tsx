import { IssueFilters, IssueLevel, IssueStatus } from "@api/issues.types";
export type Filters = {
  status: "unresolved" | "resolved" | "all";
  level: "info" | "warning" | "error" | "all";
  project: string;
};

export function convertFilters(filters: Filters): IssueFilters {
  const { status, level, project } = filters;

  const convertedFilters = {
    status:
      status && status !== "all"
        ? status === "unresolved"
          ? IssueStatus.open
          : IssueStatus.closed
        : undefined,
    level: level && level !== "all" ? (level as IssueLevel) : undefined,
    project: project,
  };

  return convertedFilters;
}
