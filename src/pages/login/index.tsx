import Layout from "@/components/layout";
import { type LoginMethod, LoginMethods } from "@/types/Login";
import { useState } from "react";

export default function Login() {
  const [method, setMethod] = useState<LoginMethod>(LoginMethods.email);

  return (
    <Layout title="Login" canGoBack>
      <div className="flex-y-center h-full">
        <p className="text-xl font-bold">Enter to Shopaholic</p>
        <p className="mt-8 text-sm font-medium text-gray-500">Enter using:</p>
        <div className="mt-5 grid w-full grid-cols-2 border-b lg:w-2/5">
          <button
            className={`border-b-2 pb-4 text-sm font-medium ${
              method === LoginMethods.email
                ? "border-cyan-500 text-cyan-400"
                : "border-transparent text-gray-500 hover:text-gray-400"
            }`}
            onClick={() => setMethod(LoginMethods.email)}
          >
            Email
          </button>
          <button
            className={`border-b-2 pb-4 text-sm font-medium ${
              method === LoginMethods.phone
                ? "border-cyan-500 text-cyan-400"
                : "border-transparent text-gray-500 hover:text-gray-400"
            }`}
            onClick={() => setMethod(LoginMethods.phone)}
          >
            Phone
          </button>
        </div>
        <div className="flex-y-center mt-8 w-full lg:w-3/5">
          <form className="flex-y-center w-full">
            <div className="flex w-full items-center justify-center">
              {method === LoginMethods.email ? (
                <input
                  type="email"
                  className="input mx-4 rounded-md lg:w-3/5"
                  placeholder="Email"
                  required
                />
              ) : (
                method === LoginMethods.phone && (
                  <div className="mx-4 flex w-full rounded-md shadow-sm lg:w-3/5">
                    <span className="flex-x-center select-none rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                      +82
                    </span>
                    <input
                      type="tel"
                      className="input rounded-md rounded-l-none"
                      placeholder="Phone number"
                      required
                    />
                  </div>
                )
              )}
            </div>
            <div className="flex-x-center w-full">
              <button className="ring-focus-2 mx-4 mt-8 w-full rounded-md border-transparent bg-cyan-400 px-3 py-2 font-bold text-white shadow-sm hover:bg-cyan-500 lg:w-3/5">
                {method === LoginMethods.email
                  ? "Get login link"
                  : method === LoginMethods.phone && "Get one-time password"}
              </button>
            </div>
          </form>
          <div className="mt-8 w-full px-4 lg:w-2/3">
            <div className="relative">
              <div className="absolute w-full border-t border-gray-300 " />
              <div className="relative -top-3 text-center">
                <span className="bg-white px-2">or enter with</span>
              </div>
            </div>
          </div>
          <div className="mt-2 grid w-full grid-cols-2 gap-3 px-4 lg:w-3/5">
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
      </div>
    </Layout>
  );
}
