import type { NextPage } from "next";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const Appearance: NextPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const systemPreference: boolean = useMediaQuery({
    query: "(prefers-color-scheme: dark)",
  });

  const handleToggle = () => {
    setIsDarkMode((prev: boolean) => {
      localStorage.setItem("shopaholic_darkmode", prev ? "false" : "true");
      if (prev) {
        document.documentElement.classList.remove("dark");
      } else {
        document.documentElement.classList.add("dark");
      }
      return !isDarkMode;
    });
  };

  useEffect(() => {
    const userSetting = localStorage.getItem("shopaholic_darkmode") === "true";
    const darkMode = userSetting || systemPreference;
    setIsDarkMode(darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    }
  }, [systemPreference]);

  return (
    <Layout title="Appearance" canGoBack>
      <div className="mt-2 flex items-center justify-between lg:mx-auto lg:w-3/5">
        <span className="text-lg font-semibold text-cyan-500">Dark Mode</span>
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            value=""
            className="peer sr-only"
            checked={isDarkMode}
            onClick={handleToggle}
            readOnly
          />
          <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-cyan-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-cyan-300 peer-focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-cyan-300"></div>
        </label>
      </div>
    </Layout>
  );
};

export default Appearance;
