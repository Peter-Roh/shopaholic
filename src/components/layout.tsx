import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import Header from "./Header";
import TabBar from "./TabBar";
import CategoryBar from "./CategoryBar";

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
        <Header title={title} canGoBack={canGoBack} router={router} />
        {router.pathname === "/" && <CategoryBar />}
      </div>
      <div
        className={`relative flex min-h-screen flex-col bg-gray-100 bg-opacity-30 px-4 pt-16 ${
          hasTabBar ? "pb-24 lg:pb-0" : ""
        }`}
      >
        {children}
      </div>
      {hasTabBar && <TabBar router={router} />}
    </div>
  );
};

export default React.memo(Layout);
