import { api } from "@/utils/api";
import type { TRPCError } from "@trpc/server";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { ParsedUrlQuery } from "querystring";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

interface ParsedUrlQueryForPage extends ParsedUrlQuery {
  code: string;
}

const GithubLogin: NextPage = () => {
  const router = useRouter();
  const { code } = router.query as ParsedUrlQueryForPage;

  const { mutateAsync, isSuccess } = api.auth.github.useMutation();

  useEffect(() => {
    async function githubLogin() {
      if (code) {
        await mutateAsync({
          code,
        }).catch((err: TRPCError) => {
          toast.error(err.message);
        });
      }
    }
    void githubLogin();
  }, [code, mutateAsync]);

  useEffect(() => {
    if (isSuccess) {
      void router.replace("/");
    }
  });

  return (
    <div className="flex-x-center h-screen w-screen">
      <p className="text-sm font-light text-gray-700">please wait...</p>
    </div>
  );
};

export default GithubLogin;
