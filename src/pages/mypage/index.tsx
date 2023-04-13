import type { NextPage } from "next";
import Layout from "@/components/Layout";
import useUser from "@/libs/client/useUser";
import Link from "next/link";
import Footer from "@/components/Footer";

const MyPage: NextPage = () => {
  const { data } = useUser();

  return (
    <Layout title="My Page" hasTabBar canGoBack>
      <div className="flex w-full flex-col">
        <div className="mt-8 rounded-md bg-white px-4 py-4 shadow-md lg:mx-auto lg:w-3/5">
          <div className="flex items-center space-x-3 lg:mx-auto lg:w-11/12">
            <div className="h-20 w-20 rounded-full bg-slate-500" />
            <div className="flex flex-col">
              <div className="flex flex-col">
                <span className="text-xl font-semibold text-gray-900">
                  {data?.name}
                </span>
                <span className="text-xs text-gray-500">{data?.email}</span>
              </div>
              <Link href="/profile/edit">
                <span className="text-xs font-semibold text-gray-700">
                  Edit profile &rarr;
                </span>
              </Link>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-between lg:mx-auto lg:w-11/12">
            <div className="flex-y-center">
              <div className="flex-x-center h-14 w-14 rounded-full bg-cyan-400 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <ellipse cx="16" cy="6" rx="5" ry="3" />
                  <path d="M11 6v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
                  <path d="M11 10v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
                  <path d="M11 14v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
                  <path d="M7 9h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" />
                  <path d="M5 15v1m0 -8v1" />
                </svg>
              </div>
              <span className="mt-2 text-sm font-medium text-gray-700">
                Sales Report
              </span>
            </div>
            <div className="flex-y-center">
              <div className="flex-x-center h-14 w-14 rounded-full bg-cyan-400 text-white">
                <svg
                  className="icon"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </div>
              <span className="mt-2 text-sm font-medium text-gray-700">
                Your Orders
              </span>
            </div>
            <div className="flex-y-center">
              <div className="flex-x-center h-14 w-14 rounded-full bg-cyan-400 text-white">
                <svg
                  className="icon"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </div>
              <span className="mt-2 text-sm font-medium text-gray-700">
                watchlist
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default MyPage;
