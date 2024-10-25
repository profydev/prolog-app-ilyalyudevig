import { axios } from "./axios";
import type { Issue, IssueFilters } from "./issues.types";
import type { Page } from "@typings/page.types";

const ENDPOINT = "/issue";

export async function getIssues(
  page: number,
  filters?: IssueFilters,
  options?: { signal?: AbortSignal },
) {
  const { status, level, project } = filters || {};

  const { data } = await axios.get<Page<Issue>>(ENDPOINT, {
    params: { page, status, level, project },
    signal: options?.signal,
  });

  return data;
}
