import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getIssues } from "@api/issues";
import type { Page } from "@typings/page.types";
import type { Issue, IssueFilters } from "@api/issues.types";

const QUERY_KEY = "issues";

export function getQueryKey(page?: number, filters?: IssueFilters) {
  if (!page) return [QUERY_KEY, filters];
  return [QUERY_KEY, page, filters];
}

export function useGetIssues(page: number, filters?: IssueFilters) {
  const query = useQuery<Page<Issue>, Error>(
    getQueryKey(page, filters),
    ({ signal }) => getIssues(page, filters, { signal }),
    { keepPreviousData: true },
  );

  // Prefetch the next page!
  const queryClient = useQueryClient();
  useEffect(() => {
    if (query.data?.meta.hasNextPage) {
      queryClient.prefetchQuery(getQueryKey(page + 1, filters), ({ signal }) =>
        getIssues(page + 1, filters, { signal }),
      );
    }
  }, [query.data, page, filters, queryClient]);

  return query;
}
