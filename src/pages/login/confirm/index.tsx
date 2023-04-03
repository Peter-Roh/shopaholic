import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useEffect } from "react";
import type { NextPage } from "next";
import type { ParsedUrlQuery } from "querystring";
import { toast } from "react-hot-toast";
import type { TRPCError } from "@trpc/server";

interface ParsedUrlQueryForPage extends ParsedUrlQuery {
  token: string;
}

const Confirm: NextPage = () => {
  const router = useRouter();
  const { token } = router.query as ParsedUrlQueryForPage;
  const { mutateAsync, isSuccess } = api.users.confirm.useMutation();

  useEffect(() => {
    async function checkToken() {
      if (token) {
        await mutateAsync({
          token,
        }).catch((err: TRPCError) => {
          toast.error(err.message);
        });
      }
    }
    void checkToken();
  }, [token, mutateAsync]);

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

export default Confirm;
