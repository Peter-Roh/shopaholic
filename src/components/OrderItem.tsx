import type { Prettify, Unpacked } from "@/types/common";
import type { RouterOutputs } from "@/utils/api";
import { getPrice } from "@/utils/common";
import type { OrderState } from "@prisma/client";
import type { NextPage } from "next";
import { useMemo } from "react";
import dayjs from "@/libs/client/day";

type OrderItem = Unpacked<RouterOutputs["purchase"]["getMany"]["orders"]>;
type OrderItemProps = Prettify<
  Pick<OrderItem, "id" | "orderState" | "orderItems" | "createdAt"> & {
    orderStateToString: (
      state: OrderState
    ) => "Checking" | "Processing" | "Completed";
  }
>;

const OrderItem: NextPage<OrderItemProps> = ({
  id,
  orderState,
  orderItems,
  createdAt,
  orderStateToString,
}) => {
  const totalPrice = useMemo(() => {
    return orderItems.reduce((prev, current) => {
      return prev + current.qty * current.item.price;
    }, 0);
  }, [orderItems]);

  console.log(createdAt);

  return (
    <div className="mb-4">
      <div className="text-gray-900">
        <span>Order ID: </span>
        <span>#{id}</span>
      </div>
      <div className="text-gray-900">
        <span>Order State: </span>
        <span>{orderStateToString(orderState)}</span>
      </div>
      <div className="text-gray-900">
        <span>Total price:</span>
        <span>${getPrice(totalPrice)}</span>
      </div>
      <div>
        <span>Order date:</span>
        <span>{dayjs(createdAt).format("YYYY.MM.DD")}</span>
      </div>
      <table className="mt-4 w-full border">
        <thead>
          <tr className="flex">
            <th className="basis-1/2 px-1 py-2">Name</th>
            <th className="basis-1/4 px-1 py-2">Price</th>
            <th className="basis-1/4 px-1 py-2">Quantity</th>
          </tr>
        </thead>
        <tbody className="w-full space-y-1 border">
          {orderItems.map((orderItem) => {
            return (
              <tr key={orderItem.id} className="flex w-full items-center">
                <td className="basis-1/2 px-1 py-2 text-center">
                  {orderItem.item.name}
                </td>
                <td className="basis-1/4 px-1 py-2 text-center">
                  {getPrice(orderItem.item.price)}
                </td>
                <td className="basis-1/4 px-1 py-2 text-center">
                  {orderItem.qty}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderItem;
