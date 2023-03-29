import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useEffect } from "react";
import type { NextPage } from "next";
import type { ParsedUrlQuery } from "querystring";

interface ParsedUrlQueryForPage extends ParsedUrlQuery {
  token: string;
}

const Confirm: NextPage = () => {
  const router = useRouter();
  const { token } = router.query as ParsedUrlQueryForPage;
  const { mutate, isSuccess } = api.users.confirm.useMutation();

  useEffect(() => {
    if (token) {
      mutate({
        token,
      });
    }
  }, [token, mutate]);

  useEffect(() => {
    if (isSuccess) {
      void router.push("/");
    }
  });

  return (
    <div className="flex-x-center h-screen w-screen">
      <p className="text-sm font-light text-gray-700">please wait...</p>
    </div>
  );
};

export default Confirm;
