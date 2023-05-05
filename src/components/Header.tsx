import type { NextPage } from "next";
import type { NextRouter } from "next/router";
import Link from "next/link";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useUser from "@/libs/client/useUser";
import Image from "next/image";
import DefaultUser from "../../public/default_user.png";
import { api } from "@/utils/api";

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
  const { data } = useUser();
  const elt = useRef<HTMLDivElement>(null);
  const avatar = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
  const { mutateAsync } = api.users.logout.useMutation();

  const handleDropdown = () => {
    if (router.pathname !== "/login") {
      setDropdownOpen(!dropdownOpen);
    }
  };

  const handleDropdownClose = useCallback(
    (e: MouseEvent) => {
      if (
        dropdownOpen &&
        (!avatar.current || !avatar.current.contains(e.target as Node)) &&
        (!elt.current || !elt.current.contains(e.target as Node))
      ) {
        setDropdownOpen(false);
      }
    },
    [dropdownOpen, avatar, elt]
  );

  useEffect(() => {
    window.addEventListener("click", handleDropdownClose);

    return () => {
      window.removeEventListener("click", handleDropdownClose);
    };
  }, [handleDropdownClose]);

  const handleLogout = useCallback(async () => {
    await mutateAsync().then(() => {
      void router.push("/login");
    });
  }, [mutateAsync, router]);

  return (
    <>
      <div className="flex items-center justify-between border-b bg-white py-3 text-lg font-medium text-gray-700 dark:bg-slate-800 dark:text-white lg:hidden">
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
      <div className="hidden w-full items-center justify-between border-b bg-white px-4 py-3 shadow-sm dark:bg-slate-800 lg:flex">
        <div className="mx-auto flex h-max w-3/5 items-center justify-between">
          <div className="flex items-center pl-3 dark:text-white">
            <div>
              <Link href="/">Shopaholic</Link>
            </div>
            <div className="ml-16 flex items-center space-x-8">
              {desktopHeader.map((elt: DesktopHeaderElement) => {
                return (
                  <div
                    key={elt.pathname}
                    className="cursor-pointer font-medium text-gray-700 decoration-cyan-500 underline-offset-2 hover:underline dark:text-white"
                  >
                    <Link href={elt.pathname}>{elt.name}</Link>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative h-8 w-8 rounded-full">
            <div
              ref={avatar}
              className="relative h-full w-full cursor-pointer"
              onClick={handleDropdown}
            >
              {data?.avatar ? (
                <Image
                  alt="profile"
                  className="rounded-full"
                  src={`https://imagedelivery.net/21n4FpHfRA-Vp-3T4t5U8Q/${data.avatar}/avatar`}
                  sizes="80px"
                  fill
                />
              ) : (
                <Image
                  alt="no-profile"
                  className="rounded-full"
                  src={DefaultUser}
                  placeholder="blur"
                  sizes="80px"
                  fill
                />
              )}
            </div>
            <div ref={elt} className={`${dropdownOpen ? "block" : "hidden"}`}>
              <div className="absolute rounded-md bg-base-100 shadow-md dark:bg-gray-600">
                <div
                  className="flex-x-center cursor-pointer whitespace-nowrap py-2 px-4 font-medium hover:bg-slate-200 dark:text-slate-100 dark:hover:bg-slate-600"
                  onClick={handleLogout}
                >
                  Log out
                </div>
                <Link href="/items/upload">
                  <div className="flex-x-center whitespace-nowrap py-2 px-4 font-medium hover:bg-slate-200 dark:text-slate-100 dark:hover:bg-slate-600">
                    Upload Item
                  </div>
                </Link>
                <Link href="/mypage">
                  <div className="flex-x-center whitespace-nowrap py-2 px-4 font-medium hover:bg-slate-200 dark:text-slate-100 dark:hover:bg-slate-600">
                    My Page
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Header);
