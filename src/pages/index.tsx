import type { NextPage } from "next";
import { api } from "@/utils/api";
import Layout from "@/components/layout";
import Item from "@/components/Item";

const Home: NextPage = () => {
  return (
    <Layout title="Home" hasTabBar canGoBack>
      <div className="flex w-full flex-col justify-start lg:mx-auto lg:w-3/5">
        <div className="h-56 w-full bg-gray-600" /> {/* TODO: carousel */}
        <div className="mt-4 space-y-2">
          <Item></Item>
          <Item></Item>
          <Item></Item>
          <Item></Item>
          <Item></Item>
        </div>
      </div>
      <button className="fixed bottom-32 right-8 cursor-pointer rounded-full bg-cyan-400 p-3 text-white shadow-xl transition-colors hover:bg-cyan-500 lg:hidden">
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
    </Layout>
  );
};

export default Home;
