import { useEffect } from "react";
import { useRouter } from "next/router";
import { api } from "@/utils/api";

export default function useUser(redirect = false) {
  const { data, error } = api.users.me.useQuery();
  const router = useRouter();

  useEffect(() => {
    if (error && redirect) {
      void router.replace("/login");
    }
  }, [router, error, redirect]);

  return {
    data,
    isLoading: !data && !error,
  };
}
