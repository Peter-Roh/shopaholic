import type { NextPage } from "next";
import Layout from "@/components/Layout";
import Item from "@/components/Item";
import Link from "next/link";
import { type RouterOutputs, api } from "@/utils/api";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import CarouselComponent from "@/components/Carousel";
import InfiniteScroll from "react-infinite-scroll-component";
import { useCallback, useEffect, useState } from "react";
import Loader from "@/components/Loader";

type ItemsArray = RouterOutputs["items"]["getMany"];

const Home: NextPage = () => {
  const { categoryId, subcategoryId } = useSelector(
    (state: RootState) => state.category
  );
  const [data, setData] = useState<ItemsArray>();
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const { mutateAsync } = api.items.getMany.useMutation();

  useEffect(() => {
    if (categoryId !== -1) {
      setHasMore(true);
      setPage(1);
    }
  }, [categoryId]);

  useEffect(() => {
    void mutateAsync({
      categoryId,
      subcategoryId,
      page: 0,
    }).then((items) => {
      setData(items);
    });
  }, [categoryId, subcategoryId, mutateAsync]);

  const getMore = useCallback(() => {
    void mutateAsync({
      categoryId,
      subcategoryId,
      page,
    }).then((items) => {
      setData((prev) => [...(prev ?? []), ...items]);
      setPage((p) => p + 1);
      if (items.length < 20) {
        setHasMore(false);
      }
    });
  }, [mutateAsync, categoryId, subcategoryId, page]);

  return (
    <Layout title="Home" hasTabBar canGoBack>
      <div className="mt-14 flex w-full flex-col justify-start lg:mx-auto lg:w-3/5">
        <CarouselComponent />
        <div className="mt-4 flex flex-col space-y-2 divide-y">
          {data ? (
            data.length === 0 ? (
              <>
                <div className="flex-y-center mt-2 text-gray-600">
                  Item not found.
                </div>
              </>
            ) : (
              <>
                <InfiniteScroll
                  dataLength={data.length}
                  next={getMore}
                  hasMore={hasMore}
                  loader={<Loader />}
                >
                  {data.map((item) => {
                    return (
                      <Item
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        image={item.image}
                        favs={item._count.favs}
                        comments={item._count.comments}
                      />
                    );
                  })}
                </InfiniteScroll>
              </>
            )
          ) : (
            <Loader />
          )}
        </div>
      </div>
      <Link href="/items/upload">
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
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </Link>
    </Layout>
  );
};

export default Home;
