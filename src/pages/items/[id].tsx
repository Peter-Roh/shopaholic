import type { NextPage } from "next";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import Image from "next/image";
import DefaultUser from "../../../public/default_user.png";

const ItemsDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data } = api.items.getById.useQuery(
    {
      itemId: parseInt(id as string),
    },
    {
      enabled: id !== undefined,
      onError: () => void router.push("/"),
    }
  );

  const { data: user } = api.users.getById.useQuery(
    { userId: data ? data.userId : -1 },
    {
      enabled: data !== undefined,
      onError: () => void router.push("/"),
    }
  );

  return (
    <Layout title="item" hasTabBar canGoBack>
      <div className="lg:mx-auto lg:w-3/5">
        <div>
          <div className="relative aspect-[4/3] w-full">
            {data ? (
              <Image
                alt="item"
                src={`https://imagedelivery.net/21n4FpHfRA-Vp-3T4t5U8Q/${data.image}/public`}
                sizes="100vw"
                fill={true}
                className="object-contain"
                priority={true}
              />
            ) : null}
          </div>
          <div className="flex flex-col">
            <span className="mt-3 text-3xl font-bold text-gray-900 dark:text-slate-100">
              {data?.name}
            </span>
            <span className="mt-3 text-3xl text-gray-900 dark:text-slate-100">
              ${data ? (data.price / 100).toFixed(2) : null}
            </span>
            <p className="my-6 text-base text-gray-700 dark:text-slate-200">
              {data?.description}
            </p>
          </div>
        </div>
        <div>
          <div className="flex-x-center space-x-2">
            <button className="ring-focus-2 flex-x-center flex-1 rounded-md bg-cyan-500 py-2 font-medium text-white hover:bg-cyan-600">
              <svg
                className="icon mr-2"
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
                  d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
              Talk to seller
            </button>
            <button className="flex-x-center ring-focus-2 rounded-md border p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
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
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>
          </div>
          <div className="mt-1 w-full">
            <button className="ring-focus-2 flex-x-center w-full rounded-md bg-lime-500 py-2 font-medium text-white hover:bg-cyan-600">
              <svg
                className="icon mr-2"
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
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
        <div className="flex cursor-pointer items-center space-x-3 border-b py-3">
          <div className="relative h-12 w-12 rounded-full">
            {user ? (
              user.avatar ? (
                <Image
                  alt="avatar"
                  src={`https://imagedelivery.net/21n4FpHfRA-Vp-3T4t5U8Q/${user.avatar}/avatar`}
                  sizes="48px"
                  fill={true}
                  className="rounded-full"
                />
              ) : (
                <Image
                  alt="no-profile"
                  src={DefaultUser}
                  sizes="48px"
                  fill={true}
                  className="rounded-full"
                  priority={true}
                />
              )
            ) : null}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-slate-200">
              {user?.name}
            </p>
            <p className="text-xs font-medium text-gray-500 dark:text-slate-400">
              View profile &rarr;
            </p>
          </div>
        </div>
        <div>
          <p className="mt-4 text-2xl font-bold text-gray-900 dark:text-slate-100">
            Similar items
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {[1, 1, 1, 1].map((_, i) => (
              <div key={i}>
                <div className="mb-2 aspect-[4/3] w-full bg-slate-300" />
                <p className="text-gray-900 ">iPhone 12</p>
                <p className="text-sm font-medium text-gray-900">$6</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemsDetail;
