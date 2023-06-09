import Layout from "@/components/Layout";
import { createHelpers } from "@/libs/server/helpers";
import { withSessionSsr } from "@/libs/server/sessions";
import { api } from "@/utils/api";
import type { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

const LiveStream: NextPage<{ id: string; userId: number | undefined }> = ({
  id,
  userId,
}) => {
  const router = useRouter();
  const { data } = api.stream.getById.useQuery(
    {
      id: parseInt(id),
      userId: userId ? userId : -1,
    },
    {
      enabled: id !== undefined,
      onError: () => void router.push("/"),
    }
  );

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView();
  });

  return (
    <Layout title="Live Stream" canGoBack>
      <div className="lg:mx-auto lg:w-3/5">
        <div className="pt-2">
          {data && (
            <iframe
              className="aspect-video w-full rounded-md shadow-sm"
              src={`https://customer-${process.env
                .NEXT_PUBLIC_CLOUDFLARE_CODE!}.cloudflarestream.com/${
                data.cloudflareId
              }/iframe`}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowFullScreen={true}
            ></iframe>
          )}
          <p className="mt-2 text-lg font-bold text-gray-800 dark:text-slate-100">
            {data?.title}
          </p>
          <div className="mt-3 mb-6 text-base text-gray-700 dark:text-slate-200">
            {data?.description}
          </div>
        </div>
        {data && data?.cloudflareKey !== "" && data?.cloudflareUrl !== "" && (
          <div className="mb-6 flex flex-col space-y-3 overflow-scroll rounded-md bg-lime-400 p-5">
            <div>Stream Keys (secret)</div>
            <div className="flex">
              <span className="font-medium text-gray-800">URL: </span>
              <div>{data?.cloudflareUrl}</div>
            </div>
            <div className="flex">
              <span className="font-medium text-gray-800">Key: </span>
              <div>{data?.cloudflareKey}</div>
            </div>
          </div>
        )}

        <div className="mt-2 mb-16 h-[55vh] space-y-4 overflow-y-scroll px-2 lg:h-full">
          <div className="flex items-start space-x-2">
            <div className="h-8 w-8 rounded-full bg-slate-400" />
            <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              <p>Hi how much is it?</p>
            </div>
          </div>
          <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
            <div className="h-8 w-8 rounded-full bg-slate-400" />
            <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              <p>I want ￦10,000</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <div className="h-8 w-8 rounded-full bg-slate-400" />
            <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              <p>Hi how much is it?</p>
            </div>
          </div>
          <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
            <div className="h-8 w-8 rounded-full bg-slate-400" />
            <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              <p>I want ￦10,000</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <div className="h-8 w-8 rounded-full bg-slate-400" />
            <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              <p>Hi how much is it?</p>
            </div>
          </div>
          <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
            <div className="h-8 w-8 rounded-full bg-slate-400" />
            <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              <p>I want ￦10,000</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <div className="h-8 w-8 rounded-full bg-slate-400" />
            <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              <p>Hi how much is it?</p>
            </div>
          </div>
          <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
            <div className="h-8 w-8 rounded-full bg-slate-400" />
            <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              <p>I want ￦10,000</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <div className="h-8 w-8 rounded-full bg-slate-400" />
            <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              <p>Hi how much is it?</p>
            </div>
          </div>
          <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
            <div className="h-8 w-8 rounded-full bg-slate-400" />
            <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              <p>I want ￦10,000</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <div className="h-8 w-8 rounded-full bg-slate-400" />
            <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              <p>Hi how much is it?</p>
            </div>
          </div>
          <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
            <div className="h-8 w-8 rounded-full bg-slate-400" />
            <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
              <p>I want ￦10,000</p>
            </div>
          </div>
          <div ref={scrollRef}></div>
        </div>

        <div className="fixed inset-x-0 bottom-0 bg-white py-2 lg:relative lg:mx-auto lg:w-3/5">
          <div className="relative flex w-full items-center px-2">
            <input
              type="text"
              className="ring-focus input w-full rounded-2xl border-gray-300 pr-12 shadow-sm focus:border-cyan-500"
            />
            <div className="absolute inset-y-0 right-2 flex py-1 pr-1">
              <button className="ring-focus-2 flex items-center rounded-2xl bg-cyan-500 px-3 text-sm text-white hover:bg-cyan-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#f2f2f2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                  <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = withSessionSsr(
  async (context: GetServerSidePropsContext) => {
    const id = context.params?.id as string;
    const { helpers, userId } = await createHelpers(context);

    await helpers.stream.getById.prefetch({
      id: parseInt(id),
      userId: userId ? userId : -1,
    });

    return {
      props: {
        trpcState: helpers.dehydrate(),
        id,
        userId,
      },
    };
  }
);

export default LiveStream;
