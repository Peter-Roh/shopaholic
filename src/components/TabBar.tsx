import type { NextPage } from "next";
import type { NextRouter } from "next/router";
import Link from "next/link";
import React, { useMemo } from "react";

type TabBarProps = {
  router: NextRouter;
};

type TabBarElement = {
  name: string;
  pathname: string;
  icon: JSX.Element;
};

const TabBar: NextPage<TabBarProps> = ({ router }) => {
  const tabBarContent: TabBarElement[] = useMemo(
    () => [
      {
        name: "Home",
        pathname: "/",
        icon: (
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
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        ),
      },
      {
        name: "Cart",
        pathname: "/cart",
        icon: (
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
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        ),
      },
      {
        name: "Watchlist",
        pathname: "/watchlist",
        icon: (
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
        ),
      },
      {
        name: "Live",
        pathname: "/live",
        icon: (
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
        ),
      },
      {
        name: "My Page",
        pathname: "/mypage",
        icon: (
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
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        ),
      },
    ],
    []
  );

  return (
    <nav className="fixed bottom-0 z-10 flex w-full items-center justify-start border-t bg-white pb-3 pt-3 text-sm font-medium text-gray-700 dark:bg-slate-800 dark:text-slate-100 lg:hidden">
      {tabBarContent.map((elt: TabBarElement) => {
        return (
          <div
            key={elt.pathname}
            className={`nav-box ${
              router.pathname === elt.pathname
                ? "text-cyan-500"
                : "text-gray-700 dark:text-slate-100"
            }`}
          >
            <Link href={elt.pathname}>
              <div className="nav-button">
                {elt.icon}
                <span>{elt.name}</span>
              </div>
            </Link>
          </div>
        );
      })}
    </nav>
  );
};

export default React.memo(TabBar);
