import type { NextPage } from "next";
import Layout from "@/components/Layout";
import Link from "next/link";

const Live: NextPage = () => {
  return (
    <Layout title="Live" hasTabBar canGoBack>
      <div className="flex flex-col space-y-2 divide-y lg:mx-auto lg:w-3/5">
        {[1, 1, 1, 1, 1].map((_, i) => (
          <Link key={i} href="/live/1">
            <div className="pt-2">
              <div className="aspect-video w-full bg-slate-300" />
              <p className="mt-2 text-lg font-medium text-gray-700">
                Live streaming!
              </p>
            </div>
          </Link>
        ))}
      </div>
      <Link href="/">
        <button className="fixed bottom-28 right-6 z-10 cursor-pointer rounded-full border-transparent bg-cyan-400 p-3 text-white shadow-xl transition-colors hover:bg-cyan-500 lg:hidden">
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
              d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </button>
      </Link>
    </Layout>
  );
};

export default Live;
