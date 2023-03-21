import type { NextPage } from "next";
import Layout from "@/components/layout";
import Item from "@/components/Item";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Layout title="Home" hasTabBar canGoBack>
      <div className="mt-14 flex w-full flex-col justify-start lg:mx-auto lg:w-3/5">
        <div className="aspect-video w-full bg-gray-600" />
        {/* TODO: carousel */}
        <div className="mt-4 flex flex-col space-y-2 divide-y">
          {[1, 1, 1, 1, 1].map((_, i) => (
            <Item key={i}></Item>
          ))}
        </div>
      </div>
      <Link href="/items/upload">
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
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </Link>
    </Layout>
  );
};

export default Home;
