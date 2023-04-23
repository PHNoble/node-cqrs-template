import type { User } from "@prisma/client"
import { swrFetcher } from "../fetchers";
import useSWR from "swr";


export function useUser() {
  const { data: user, error, isLoading } = useSWR("/api/user", swrFetcher<User>)
  return { user: error ? undefined : user, error, isLoading };
}