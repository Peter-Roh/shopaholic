import CartItem from "@/components/CartItem";
import Layout from "@/components/Layout";
import { api } from "@/utils/api";
import { getPrice } from "@/utils/common";
import type { NextPage } from "next";
import React, { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

const Cart: NextPage = () => {
  const { data, refetch } = api.cart.getMyCart.useQuery();

  const totalPrice = useMemo(() => {
    if (!data) {
      return 0;
    }

    return data.cart.reduce((prev, current) => {
      return prev + current.qty * current.item.price;
    }, 0);
  }, [data]);

  const { mutateAsync } = api.cart.delete.useMutation();
  const handleOnDelete = useCallback(
    async (e: React.BaseSyntheticEvent, id: number) => {
      e.preventDefault();
      await mutateAsync({ cartItemId: id }).then(() => {
        // ? should I use optimistic update here?
        void refetch();
        toast.success("The item was deleted from your cart!");
      });
    },
    [mutateAsync, refetch]
  );

  return (
    <Layout title="Cart" canGoBack hasTabBar>
      <div className="flex flex-col lg:mx-auto lg:w-3/5">
        <div className="flex flex-col space-y-2 divide-y">
          {data && data.cart.length === 0 ? (
            <>
              <div className="flex-y-center my-2 text-gray-600">
                Item not found.
              </div>
            </>
          ) : (
            data?.cart.map((item) => {
              return (
                <CartItem
                  key={item.id}
                  id={item.itemId}
                  name={item.item.name}
                  description={item.item.description}
                  price={item.item.price}
                  qty={item.qty}
                  image={item.item.image}
                  cartItemId={item.id}
                  handleOnDelete={handleOnDelete}
                />
              );
            })
          )}
          <div className="mt-4 flex items-center justify-between pt-4 dark:text-slate-100">
            <span className="ml-2 font-semibold">total</span>
            <span className="mr-2 font-semibold">${getPrice(totalPrice)}</span>
          </div>
          {
            // TODO 결제
          }
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
