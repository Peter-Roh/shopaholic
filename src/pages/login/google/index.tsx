import { api } from "@/utils/api";
import type { TRPCError } from "@trpc/server";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const GoogleLogin: NextPage = () => {
  const router = useRouter();
  const params = router.asPath.split("#")[1];
  const accessToken = params?.split("&")[0]?.split("=")[1];

  const { mutateAsync, isSuccess } = api.auth.google.useMutation();

  useEffect(() => {
    async function googleLogin() {
      if (accessToken) {
        await mutateAsync({
          accessToken,
        }).catch((err: TRPCError) => {
          toast.error(err.message);
        });
      }
    }
    void googleLogin();
  }, [accessToken, mutateAsync]);

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

export default GoogleLogin;
