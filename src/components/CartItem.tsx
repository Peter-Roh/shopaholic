import { getPrice } from "@/utils/common";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type CartItemProps = {
  id: number;
  name: string;
  description: string;
  price: number;
  qty: number;
  image: string;
  cartItemId: number;
  handleOnDelete: (e: React.BaseSyntheticEvent, id: number) => Promise<void>;
};

const CartItem: NextPage<CartItemProps> = ({
  id,
  name,
  description,
  price,
  qty,
  image,
  cartItemId,
  handleOnDelete,
}) => {
  return (
    <Link href={`/items/${id}`}>
      <div className="flex cursor-pointer items-center justify-between">
        <div className="flex">
          <div className="relative h-20 w-20">
            <Image
              alt="item"
              className="rounded-md object-contain"
              src={`https://imagedelivery.net/21n4FpHfRA-Vp-3T4t5U8Q/${image}/public`}
              sizes="80px"
              priority={true}
              fill
            />
          </div>
          <div className="ml-4 flex flex-col items-start justify-start">
            <span className="text-lg font-bold text-gray-900 dark:text-slate-100">
              {name}
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-slate-400">
              {description}
            </span>
            <span className="mt-1 font-medium text-gray-900 dark:text-slate-100">
              ${getPrice(price)}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start dark:text-slate-100">
          <div>
            <span className="text-sm">Quantity</span>
          </div>
          <div className="tesxt-xl mt-auto">
            <span>{qty}</span>
          </div>
          <div className="mt-1" onClick={(e) => handleOnDelete(e, cartItemId)}>
            <svg
              className="h-4 w-4"
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
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CartItem;
