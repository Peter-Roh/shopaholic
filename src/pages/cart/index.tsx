import CartItem from "@/components/CartItem";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import useUser from "@/libs/client/useUser";
import { createHelpers } from "@/libs/server/helpers";
import { withSessionSsr } from "@/libs/server/sessions";
import { api } from "@/utils/api";
import { getPrice } from "@/utils/common";
import type { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

const Cart: NextPage = () => {
  const { data, refetch } = api.cart.getMyCart.useQuery();
  const { data: user } = useUser();
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

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
        void refetch();
        toast.success("The item was deleted from your cart!");
      });
    },
    [mutateAsync, refetch]
  );
  const { mutateAsync: purchaseAsync } = api.purchase.create.useMutation();

  const handleOnPurchase = () => {
    setModalOpen(true);
  };

  const handleOnConfirm = useCallback(() => {
    void purchaseAsync({ userId: user.id }).then(() => {
      void router.push("/purchase/done");
    });
  }, [router, purchaseAsync, user.id]);

  const Content = useMemo(() => {
    return (
      <div className="flex-x-center my-6 mx-4">This is a fake purchase.</div>
    );
  }, []);

  return (
    <Layout title="Cart" canGoBack hasTabBar>
      <div className="flex flex-col lg:mx-auto lg:w-3/5">
        <div className="mb-4 flex flex-col space-y-2 divide-y">
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
          <div className="mt-4 flex items-center justify-between py-4 dark:text-slate-100">
            <span className="ml-2 font-semibold">total</span>
            <span className="mr-2 font-semibold">${getPrice(totalPrice)}</span>
          </div>
          <div
            onClick={handleOnPurchase}
            className={`flex-x-center w-full rounded-md py-2 font-medium text-white  ${
              data?.cart.length === 0
                ? "bg-gray-500"
                : "ring-focus-2 bg-lime-500 hover:bg-lime-600 focus:ring-lime-500"
            }`}
          >
            Purchase
          </div>
        </div>
      </div>
      <Modal
        modalType="Confirm"
        isOpen={modalOpen}
        confirmText="Confirm"
        onConfirm={handleOnConfirm}
        content={Content}
      />
    </Layout>
  );
};

export const getServerSideProps = withSessionSsr(
  async (context: GetServerSidePropsContext) => {
    const { helpers } = await createHelpers(context);

    await helpers.cart.getMyCart.prefetch();

    return {
      props: {
        trpcState: helpers.dehydrate(),
      },
    };
  }
);

export default Cart;
