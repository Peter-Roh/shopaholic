import type { NextPage } from "next";
import type { NextRouter } from "next/router";
import Link from "next/link";
import React, { useMemo } from "react";

type HeaderProps = {
  title: string;
  canGoBack?: boolean;
  router: NextRouter;
};

type DesktopHeaderElement = {
  name: string;
  pathname: string;
};

const Header: NextPage<HeaderProps> = ({ title, canGoBack, router }) => {
  const desktopHeader: DesktopHeaderElement[] = useMemo(
    () => [
      {
        name: "Cart",
        pathname: "/",
      },
      {
        name: "Chat",
        pathname: "/chats",
      },
      {
        name: "Live",
        pathname: "/live",
      },
    ],
    []
  );

  return (
    <>
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
            <div>
              <Link href="/">Shopaholic</Link>
            </div>
            <div className="ml-16 flex items-center space-x-8">
              {desktopHeader.map((elt: DesktopHeaderElement) => {
                return (
                  <div
                    key={elt.pathname}
                    className="cursor-pointer font-medium text-gray-700 decoration-cyan-500 underline-offset-2 hover:underline"
                  >
                    <Link href={elt.pathname}>{elt.name}</Link>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="h-8 w-8 rounded-full bg-slate-500" />
        </div>
      </div>
    </>
  );
};

export default React.memo(Header);
