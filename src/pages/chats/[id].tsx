import type { NextPage } from "next";
import Layout from "@/components/Layout";

const ChatDetail: NextPage = () => {
  return (
    <Layout title="Chatroom" canGoBack>
      <div className="space-y-4 px-2 pb-16 lg:mx-auto lg:w-3/5">
        <div className="flex items-start space-x-2">
          <div className="h-8 w-8 rounded-full bg-slate-400" />
          <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
            <p>Hi how much is it?</p>
          </div>
        </div>
        <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
          <div className="h-8 w-8 rounded-full bg-slate-400" />
          <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
            <p>I want ￦10,000</p>
          </div>
        </div>
        <div className="fixed inset-x-0 bottom-0 py-2 lg:mx-auto lg:w-3/5">
          <div className="relative flex w-full items-center px-2">
            <input
              type="text"
              className="ring-focus input w-full rounded-2xl border-gray-300 pr-12 shadow-sm focus:border-cyan-500"
            />
            <div className="absolute inset-y-0 right-2 flex py-1 pr-1">
              <button className="ring-focus-2 flex items-center rounded-2xl bg-cyan-500 px-3 text-sm text-white hover:bg-cyan-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#f2f2f2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                  <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatDetail;
