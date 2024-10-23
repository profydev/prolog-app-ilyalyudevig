export enum IssueStatus {
  open = "open",
  closed = "resolved",
}

export enum IssueLevel {
  info = "info",
  warning = "warning",
  error = "error",
}

export type Issue = {
  id: string;
  projectId: string;
  name: string;
  message: string;
  stack: string;
  level: IssueLevel;
  numEvents: number;
  numUsers: number;
};

export type IssueFilters = {
  status: IssueStatus | undefined;
  level: IssueLevel | undefined;
  project: string | undefined;
};
