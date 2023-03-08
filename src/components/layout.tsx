import Link from "next/link";
import { useRouter } from "next/router";

type LayoutProps = {
  title: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
};

export default function Layout({
  title,
  canGoBack,
  hasTabBar,
  children,
}: LayoutProps) {
  const router = useRouter();
  const onClick = () => router.back();

  return (
    <div className="page-full">
      <div className="fixed top-0 flex w-full items-center justify-between border-b bg-white py-3 text-lg font-medium text-gray-700 lg:hidden">
        <div className="flex-x-center h-max w-8">
          {canGoBack ? (
            <button onClick={onClick}>
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
          ) : null}
        </div>
        <span>{title}</span>
        <div className="flex-x-center h-max w-8"></div>
      </div>
      <div className="fixed top-0 hidden w-full items-center justify-between border-b bg-white px-4 py-3 shadow-sm lg:flex">
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
                <Link href="/">Live</Link>
              </div>
            </div>
          </div>
          <div className="h-8 w-8 rounded-full bg-slate-500" />
        </div>
      </div>
      <div className="h-screen bg-gray-100 bg-opacity-30 px-4 pt-16 pb-24">
        {children}
      </div>
      {hasTabBar ? (
        <nav className="fixed bottom-0 flex w-full items-center justify-start border-t bg-white pb-3 pt-3 text-sm font-medium text-gray-700 lg:hidden">
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
                    d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>
                <span>Chat</span>
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
      ) : null}
    </div>
  );
}
