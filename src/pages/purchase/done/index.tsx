import Layout from "@/components/Layout";
import type { NextPage } from "next";

const PurchaseDone: NextPage = () => {
  return (
    <Layout title="Purchase" hasTabBar>
      <div className="flex flex-col">
        <div className="flex-x-center my-5">
          <svg
            className="h-10 w-10"
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
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="flex-x-center text-2xl font-bold text-gray-800">
          Your order is complete!
        </div>
        <div className="flex-x-center mt-2 font-semibold text-gray-700">
          Thank you for your order.
        </div>
      </div>
    </Layout>
  );
};

export default PurchaseDone;
