import type { AppProps, AppType } from "next/app";
import { Toaster } from "react-hot-toast";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Provider } from "react-redux";
import store from "@/store";

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  const systemPreference: boolean = useMediaQuery({
    query: "(prefers-color-scheme: dark)",
  });

  useEffect(() => {
    const userSetting = localStorage.getItem("shopaholic_darkmode") === "true";
    const darkMode = userSetting || systemPreference;
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [systemPreference]);

  return (
    <>
      <Provider store={store}>
        <Toaster position="bottom-center" />
        <Component {...pageProps} />
      </Provider>
    </>
  );
};

export default api.withTRPC(MyApp);
