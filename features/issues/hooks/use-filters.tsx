import { useRouter } from "next/router";
import { Filters } from "@features/issues";
export const useFilters = () => {
  const router = useRouter();

  const filters = {
    status: router.query.status,
    level: router.query.level,
    project: router.query.project,
  } as Filters;

  const handleFilters = (newFilters: object) => {
    const query = { ...router.query, ...newFilters };
    router.push({ query });
  };

  return { filters, handleFilters };
};
