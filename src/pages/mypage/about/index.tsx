import type { NextPage } from "next";
import Layout from "@/components/Layout";

const About: NextPage = () => {
  return (
    <Layout title="About" canGoBack>
      <div className="flex w-full flex-col lg:mx-auto lg:w-3/5">
        <span className="mt-2">Thank you for visiting this website.</span>
        <div className="mt-2 flex text-gray-800">
          <span className="font-medium">Roh Minchul</span>
          <span className="ml-1">&lt;minchul.roh.peter@gmail.com&gt;</span>
        </div>
      </div>
    </Layout>
  );
};

export default About;
