import Layout from "@/components/layout";
import Link from "next/link";

export default function Chats() {
  return (
    <Layout title="Chats" hasTabBar canGoBack>
      <div className="divide-y-[1px] lg:mx-auto lg:w-3/5">
        {[1, 1, 1, 1, 1].map((_, i) => (
          <div key={i}>
            <Link href="/chats/1" className="h-full w-full">
              <div className="flex cursor-pointer items-center space-x-3 px-3 py-3">
                <div className="h-12 w-12 rounded-full bg-slate-500" />
                <div>
                  <p className="text-gray-700">Peter Roh</p>
                  <p className="text-sm text-gray-500">See you tomorrow!</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
}
