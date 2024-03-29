import type { Prettify, Unpacked } from "@/types/common";
import type { RouterOutputs } from "@/utils/api";
import { getPrice } from "@/utils/common";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

// infer types from the api
type Item = Unpacked<RouterOutputs["items"]["getMany"]>;
type ItemProps = Prettify<
  Pick<Item, "id" | "name" | "description" | "price" | "image"> &
    Pick<Item, "_count">["_count"]
>;

const Item: NextPage<ItemProps> = ({
  id,
  name,
  description,
  price,
  image,
  favs,
  comments,
}) => {
  return (
    <Link href={`/items/${id}`}>
      <div className="flex cursor-pointer items-center justify-between space-x-4 pt-2">
        <div className="flex">
          <div className="relative h-20 min-h-[80px] w-20 min-w-[80px]">
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
            <span className="line-clamp-2 text-lg font-bold text-gray-900 dark:text-slate-100">
              {name}
            </span>
            <span className="line-clamp-2 text-xs font-medium text-gray-500 dark:text-slate-400">
              {description}
            </span>
            <span className="mt-1 font-medium text-gray-900 dark:text-slate-100">
              ${getPrice(price)}
            </span>
          </div>
        </div>
        <div className="mt-auto flex items-end justify-end space-x-1.5">
          <div className="flex-x-center space-x-0.5 text-sm text-gray-600">
            <svg
              className="h-4 w-4 text-red-700"
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
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            <span className="dark:text-slate-200">{favs}</span>
          </div>
          <div className="flex-x-center space-x-0.5 text-sm text-gray-600">
            <svg
              className="h-4 w-4 dark:text-slate-200"
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
                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
              />
            </svg>
            <span className="dark:text-slate-200">{comments}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Item;
