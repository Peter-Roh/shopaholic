import type { NextPage } from "next";
import Layout from "@/components/layout";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type RouterInputs, api } from "@/utils/api";
import { toast } from "react-hot-toast";
import { enterInput } from "@/server/api/schema";

type FormValues = RouterInputs["users"]["login"];

const Login: NextPage = () => {
  const { register, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(enterInput),
  });

  const { mutate, isLoading, isSuccess } = api.users.login.useMutation();

  const onValid: SubmitHandler<FormValues> = ({ email }) => {
    mutate({
      email,
    });
  };

  const onError = () => {
    toast.error("Please enter a valid email address.");
  };

  return (
    <Layout title="Login" canGoBack>
      <div className="flex-y-center">
        <p className="mt-16 text-xl font-bold">Enter to Shopaholic</p>
        <div className="flex-y-center mt-8 w-full px-4 lg:w-3/5">
          <form
            className="flex-y-center w-full px-4"
            onSubmit={handleSubmit(onValid, onError)}
          >
            <div className="flex-y-center w-full">
              <div className="flex-y-center w-full">
                {isLoading && (
                  <div className="flex-x-center mb-2 w-full rounded-md bg-blue-300 px-4 py-2 text-xs font-semibold leading-4 text-blue-700 lg:w-3/5">
                    <svg
                      aria-hidden="true"
                      className="mr-2 h-3 w-3 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    Please wait...
                  </div>
                )}
                {isSuccess && (
                  <div className="flex-x-center mb-2 w-full rounded-md bg-green-300 px-4 py-2 text-xs font-semibold leading-4 text-green-700 lg:w-3/5">
                    ✅ Please check your email to get the login link
                  </div>
                )}
                <input
                  {...register("email", {
                    required: true,
                  })}
                  type="text"
                  className="input rounded-md lg:w-3/5"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="flex-y-center w-full">
              <button className="ring-focus-2 mt-6 w-full rounded-md border-transparent bg-cyan-400 px-3 py-2 font-bold text-white shadow-sm hover:bg-cyan-500 lg:w-3/5">
                Get login link
              </button>
            </div>
          </form>
          <div className="mt-10 w-full px-4 lg:w-2/3">
            <div className="relative">
              <div className="absolute w-full border-t border-gray-300 " />
              <div className="relative -top-3 text-center">
                <span className="bg-white px-2">or enter with</span>
              </div>
            </div>
          </div>
          <div className="mt-4 grid w-full grid-cols-2 gap-3 px-4 lg:w-3/5">
            <button className="flex-x-center ring-focus rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm hover:bg-gray-300 focus:ring-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
            </button>
            <button className="flex-x-center ring-focus rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm hover:bg-gray-300 focus:ring-1">
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="mt-2 text-xs text-slate-500">
          © 2023. Roh Minchul All rights reserved.
        </div>
      </div>
    </Layout>
  );
};

export default Login;
