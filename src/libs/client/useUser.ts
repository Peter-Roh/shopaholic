import { useEffect } from "react";
import { useRouter } from "next/router";
import { api } from "@/utils/api";

export default function useUser() {
  const { data, error, isError, refetch } = api.users.me.useQuery(undefined, {
    staleTime: 1000 * 60 * 60 * 24, // one day
  });
  const router = useRouter();

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
