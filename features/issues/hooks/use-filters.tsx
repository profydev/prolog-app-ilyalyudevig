import { useRouter } from "next/router";

export const useFilters = () => {
  const router = useRouter();

  const filters = {
    status: router.query.status,
    level: router.query.level,
    project: router.query.project,
  };

  const handleFilters = (newFilters: object) => {
    const query = { ...router.query, ...newFilters };
    router.push({ query });
  };

  return { filters, handleFilters };
};
