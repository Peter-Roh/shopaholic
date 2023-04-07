import type { NextPage } from "next";
import Layout from "@/components/Layout";

const ItemsDetail: NextPage = () => {
  return (
    <Layout title="item" hasTabBar canGoBack>
      <div className="lg:mx-auto lg:w-3/5">
        <div>
          <div className="aspect-[4/3] w-full bg-slate-300" />
          <div className="flex flex-col">
            <span className="mt-3 text-3xl font-bold text-gray-900">
              Galaxy S22
            </span>
            <span className="mt-3 text-3xl text-gray-900">$40</span>
            <p className="my-6 text-base text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
              nesciunt, sint dolorem molestiae accusamus iusto laboriosam ipsum
              vitae quas minus corporis id tenetur dolore iste quae tempore
              dolor natus rem?
            </p>
          </div>
        </div>
        <div className="flex-x-center space-x-2">
          <button className="ring-focus-2 flex-1 rounded-md bg-cyan-500 py-2 font-medium text-white hover:bg-cyan-600">
            Talk to seller
          </button>
          <button className="flex-x-center ring-focus-2 rounded-md border p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
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
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>
        </div>
        <div className="flex cursor-pointer items-center space-x-3 border-b py-3">
          <div className="h-12 w-12 rounded-full bg-slate-300" />
          <div>
            <p className="text-sm font-medium text-gray-700">Steve</p>
            <p className="text-xs font-medium text-gray-500">
              View profile &rarr;
            </p>
          </div>
        </div>
        <div>
          <p className="mt-4 text-2xl font-bold text-gray-900">Similar items</p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {[1, 1, 1, 1].map((_, i) => (
              <div key={i}>
                <div className="mb-2 aspect-[4/3] w-full bg-slate-300" />
                <p className="text-gray-900 ">iPhone 12</p>
                <p className="text-sm font-medium text-gray-900">$6</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemsDetail;
