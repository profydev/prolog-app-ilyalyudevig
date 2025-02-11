import { useQuery } from "@tanstack/react-query";
import { getLanding } from "@api/landing";

export function useGetLanding() {
  return useQuery(["landing"], getLanding);
}
