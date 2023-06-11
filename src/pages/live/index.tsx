import type { NextPage } from "next";
import Layout from "@/components/Layout";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { type RouterOutputs, api } from "@/utils/api";
import Loader from "@/components/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import Stream from "@/components/Stream";

type StreamArray = RouterOutputs["stream"]["getMany"];

const Live: NextPage = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<StreamArray>();
  const [hasMore, setHasMore] = useState(true);
  const { mutateAsync } = api.stream.getMany.useMutation();

  const getMore = useCallback(() => {
    void mutateAsync({ page }).then((streams) => {
      setData((prev) => [...(prev ?? []), ...streams]);
      setPage((p) => p + 1);
      if (streams.length < 20) {
        setHasMore(false);
      }
    });
  }, [mutateAsync, page]);

  useEffect(() => {
    void mutateAsync({ page: 0 }).then((streams) => {
      setData(streams);
    });
  }, [mutateAsync]);

  return (
    <Layout title="Live" hasTabBar canGoBack>
      <div className="flex flex-col space-y-2 divide-y lg:mx-auto lg:w-3/5">
        {data ? (
          data.length === 0 ? (
            <>
              <div className="flex-y-center mt-2 text-gray-600">
                Live streaming not found.
              </div>
            </>
          ) : (
            <InfiniteScroll
              dataLength={data.length}
              next={getMore}
              hasMore={hasMore}
              loader={<Loader />}
            >
              {data.map((stream) => {
                return (
                  <Stream
                    key={stream.id}
                    id={stream.id}
                    title={stream.title}
                    name={stream.user.name}
                    avatar={stream.user.avatar}
                    thumbnail={stream.thumbnail}
                  />
                );
              })}
            </InfiniteScroll>
          )
        ) : (
          <Loader />
        )}
      </div>
      <Link href="/stream/create">
        <button className="fixed bottom-28 right-6 z-10 cursor-pointer rounded-full border-transparent bg-cyan-400 p-3 text-white shadow-xl transition-colors hover:bg-cyan-500 lg:hidden">
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
              d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </button>
      </Link>
    </Layout>
  );
};

export default Live;
