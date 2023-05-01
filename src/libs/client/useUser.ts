import { useEffect } from "react";
import { useRouter } from "next/router";
import { api } from "@/utils/api";

export default function useUser() {
  const router = useRouter();
  const { data, error, isError, refetch } = api.users.me.useQuery(undefined, {
    staleTime: 1000 * 60 * 60 * 24, // one day
    enabled: router.pathname !== "/login",
  });

  useEffect(() => {
    if (isError) {
      void router.replace("/login");
    }
  }, [router, isError]);

  return {
    data: data!,
    refetch,
    isLoading: !data && !error,
  };
}
