import type { NextPage } from "next";
import { api } from "@/utils/api";
import Layout from "@/components/layout";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <Layout title="Home" hasTabBar canGoBack>
      <div>
        <p>{hello.data?.greeting}</p>
      </div>
    </Layout>
  );
};

export default Home;
