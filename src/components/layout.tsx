import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import TabBar from "./tabbar";

type LayoutProps = {
  title: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
};

const Layout: NextPage<LayoutProps> = ({
  title,
  canGoBack,
  hasTabBar,
  children,
}) => {
  const router = useRouter();

  return (
    <div className="page-full">
      <div className="fixed top-0 z-10 w-full">
        <div className="flex items-center justify-between border-b bg-white py-3 text-lg font-medium text-gray-700 lg:hidden">
          <div className="flex-x-center h-max w-8">
            {canGoBack && (
              <button onClick={() => router.back()}>
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
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
            )}
          </div>
          <span>{title}</span>
          <div className="flex-x-center h-max w-8"></div>
        </div>
        <div className="hidden w-full items-center justify-between border-b bg-white px-4 py-3 shadow-sm lg:flex">
          <div className="mx-auto flex h-max w-3/5 items-center justify-between">
            <div className="flex items-center pl-3">
              <div>Shopaholic</div>
              <div className="ml-16 flex items-center space-x-8">
                <div className="cursor-pointer font-medium text-gray-700 decoration-cyan-500 underline-offset-2 hover:underline">
                  <Link href="/">Cart</Link>
                </div>
                <div className="cursor-pointer font-medium text-gray-700 decoration-cyan-500 underline-offset-2 hover:underline">
                  <Link href="/chats">Chat</Link>
                </div>
                <div className="cursor-pointer font-medium text-gray-700 decoration-cyan-500 underline-offset-2 hover:underline">
                  <Link href="/live">Live</Link>
                </div>
              </div>
            </div>
            <div className="h-8 w-8 rounded-full bg-slate-500" />
          </div>
        </div>
        {router.route === "/" && (
          <div className="no-scrollbar overflow-x-scroll border-b bg-white py-3 text-lg font-medium text-gray-700">
            <div className="mx-auto flex h-max items-center justify-start lg:w-3/5">
              <div className="ml-4">|</div>
              <div className="ml-2 flex items-center justify-center whitespace-nowrap">
                <p>category 1</p>
                <svg
                  className="ml-1 h-4 w-4"
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
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
              <div>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
              <div className="ml-2 flex items-center justify-center whitespace-nowrap">
                <p>category 2</p>
                <svg
                  className="ml-1 h-4 w-4"
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
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
              <div>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
              <div className="ml-2 flex items-center justify-center whitespace-nowrap">
                <p>category 3</p>
                <svg
                  className="ml-1 h-4 w-4"
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
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        className={`relative min-h-screen bg-gray-100 bg-opacity-30 px-4 pt-16 ${
          hasTabBar ? "pb-24" : ""
        }`}
      >
        {children}
      </div>
      {hasTabBar && <TabBar />}
    </div>
  );
};

export default React.memo(Layout);
