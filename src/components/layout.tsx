import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

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
      {hasTabBar && (
        <nav className="fixed bottom-0 z-10 flex w-full items-center justify-start border-t bg-white pb-3 pt-3 text-sm font-medium text-gray-700 lg:hidden">
          <div className="nav-box">
            <Link href="/">
              <div className="nav-button">
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
                <span>Home</span>
              </div>
            </Link>
          </div>
          <div className="nav-box">
            <Link href="/">
              <div className="nav-button">
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
                <span>Cart</span>
              </div>
            </Link>
          </div>
          <div className="nav-box">
            <Link href="/chats">
              <div className="nav-button">
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
                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                  />
                </svg>
                <span>Chat</span>
              </div>
            </Link>
          </div>
          <div className="nav-box">
            <Link href="/live">
              <div className="nav-button">
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
                <span>Live</span>
              </div>
            </Link>
          </div>
          <div className="nav-box">
            <Link href="/mypage">
              <div className="nav-button">
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
                <span>My Page</span>
              </div>
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Layout;
