import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import OrderItem from "@/components/OrderItem";
import { type RouterOutputs, api } from "@/utils/api";
import type { OrderState } from "@prisma/client";
import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

type OrderArray = RouterOutputs["purchase"]["getMany"]["orders"];

const Orders: NextPage = () => {
  const [data, setData] = useState<OrderArray>();
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const { mutateAsync } = api.purchase.getMany.useMutation();

  useEffect(() => {
    void mutateAsync({
      page: 0,
    }).then(({ orders }) => {
      setData(orders);
    });
  }, [mutateAsync]);

  const getMore = useCallback(() => {
    void mutateAsync({
      page,
    }).then(({ orders }) => {
      setData((prev) => [...(prev ?? []), ...orders]);
      setPage((p) => p + 1);
      if (orders.length < 10) {
        setHasMore(false);
      }
    });
  }, [mutateAsync, page]);

  const orderStateToString = useCallback((state: OrderState) => {
    switch (state) {
      case "CHECKING":
        return "Checking";
      case "PROCESSING":
        return "Processing";
      case "COMPLETED":
        return "Completed";
    }
  }, []);

  return (
    <Layout title="Orders" canGoBack hasTabBar>
      <div className="lg:mx-auto lg:w-3/5">
        {data ? (
          data.length === 0 ? (
            <>
              <div className="flex-y-center mt-2 text-gray-600 dark:text-white">
                Order not found.
              </div>
            </>
          ) : (
            <InfiniteScroll
              dataLength={data.length}
              next={getMore}
              hasMore={hasMore}
              loader={<Loader />}
            >
              {data.map((order) => {
                return (
                  <OrderItem
                    key={order.id}
                    id={order.id}
                    orderState={order.orderState}
                    orderItems={order.orderItems}
                    createdAt={order.createdAt}
                    orderStateToString={orderStateToString}
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

export default Orders;
