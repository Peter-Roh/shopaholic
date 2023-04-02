import type { NextPage } from "next";
import Layout from "@/components/layout";

const Upload: NextPage = () => {
  return (
    <Layout title="Upload" canGoBack>
      <div className="lg:mx-auto lg:w-3/5">
        <div className="flex-x-center mb-6 w-full">
          <label className="flex-x-center aspect-[4/3] w-full cursor-pointer rounded-md border-2 border-dashed border-gray-300 text-gray-600 hover:border-cyan-500 hover:text-cyan-500">
            <svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input className="hidden" type="file" />
          </label>
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-base font-medium text-gray-700"
            htmlFor="category"
          >
            Category
          </label>
          <div className="flex-x-center relative rounded-md shadow-md">
            {/* TODO */}
          </div>
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-base font-medium text-gray-700"
            htmlFor="price"
          >
            Price
          </label>
          <div className="flex-x-center relative rounded-md shadow-md">
            <div className="flex-x-center pointer-events-none absolute left-0 pl-3">
              <span className="text-sm text-gray-500">$</span>
            </div>
            <input
              id="price"
              className="ring-focus w-full appearance-none rounded-md border border-gray-400 px-3 py-2 pl-7 placeholder-gray-400 shadow-sm focus:border-cyan-500"
              type="text"
              placeholder="0.00"
            />
            <div className="flex-x-center pointer-events-none absolute right-0 pr-3">
              <span className="text-gray-500">USD</span>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-base font-medium text-gray-700">
            Description
          </label>
          <textarea
            className="ring-focus w-full rounded-md border-gray-500 shadow-sm focus:border-cyan-500"
            rows={4}
          />
        </div>
        <button className="ring-focus-2 w-full rounded-md border border-transparent bg-cyan-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-cyan-600">
          Upload Product!
        </button>
      </div>
    </Layout>
  );
};

export default Upload;
