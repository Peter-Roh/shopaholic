import Item from "@/components/Item";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import { type RouterOutputs, api } from "@/utils/api";
import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

type Watchlist = NonNullable<RouterOutputs["favorite"]["watchlist"]>["favs"];

const WatchList: NextPage = () => {
  const [data, setData] = useState<Watchlist>();
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const { mutateAsync } = api.favorite.watchlist.useMutation();

  useEffect(() => {
    void mutateAsync({ page: 0 }).then((res) => {
      if (res) {
        setData([...res.favs]);
      }
    });
  }, [mutateAsync]);

  const getMore = useCallback(
    () =>
      mutateAsync({
        page,
      }).then((res) => {
        if (res) {
          setData((prev) => [...(prev ?? []), ...res.favs]);
          if (res.favs.length < 20) {
            setHasMore(false);
          }
        }
        setPage((p) => p + 1);
      }),
    [mutateAsync, page]
  );

  return (
    <Layout title="Watchlist" canGoBack hasTabBar>
      <div className="flex min-h-screen w-full flex-col space-y-2 divide-y lg:mx-auto lg:w-3/5">
        {data ? (
          data.length === 0 ? (
            <>
              <div className="flex-y-center mt-2 text-gray-600">
                Item not found.
              </div>
            </>
          ) : (
            <InfiniteScroll
              dataLength={data.length}
              next={getMore}
              hasMore={hasMore}
              loader={<Loader />}
              pullDownToRefresh={true}
              refreshFunction={getMore}
            >
              {data.map((item) => {
                return (
                  <Item
                    key={item.item.id}
                    id={item.item.id}
                    name={item.item.name}
                    description={item.item.description}
                    price={item.item.price}
                    image={item.item.image}
                    favs={item.item._count.favs}
                    comments={item.item._count.comments}
                  />
                );
              })}
            </InfiniteScroll>
          )
        ) : (
          <Loader />
        )}
      </div>
    </Layout>
  );
};

export default WatchList;
