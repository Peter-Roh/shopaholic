import type { AppProps, AppType } from "next/app";
import { Toaster } from "react-hot-toast";
import { api } from "@/utils/api";
import "@/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Toaster position="bottom-center" />
      <Component {...pageProps} />
    </>
  );
};

export default api.withTRPC(MyApp);
