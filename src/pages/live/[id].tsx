import Layout from "@/components/Layout";
import { createHelpers } from "@/libs/server/helpers";
import { withSessionSsr } from "@/libs/server/sessions";
import { api } from "@/utils/api";
import type { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const LiveStream: NextPage<{ id: string; userId: number | undefined }> = ({
  id,
  userId,
}) => {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const { data, refetch } = api.stream.getById.useQuery(
    {
      id: parseInt(id),
      userId: userId ? userId : -1,
    },
    {
      enabled: id !== undefined,
      onError: () => void router.push("/live"),
    }
  );

  const { mutateAsync } = api.stream.stop.useMutation();

  const { data: streamState } = api.stream.watch.useQuery(
    {
      uid: data?.cloudflareId ? data.cloudflareId : "",
    },
    {
      enabled: data?.cloudflareId !== "",
      refetchInterval: !started && data?.videoUid === "" ? 1000 : false,
    }
  );

  const { mutateAsync: updateStreamInfo } = api.stream.start.useMutation({});

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView();
  });

  const onStopStreaming = () => {
    void mutateAsync({ id: parseInt(id) }).then(() => {
      void router.push("/live");
    });
  };

  useEffect(() => {
    if (
      !started &&
      data &&
      data.isStreaming === null &&
      streamState &&
      streamState.live &&
      streamState.videoUID
    ) {
      if (userId === data.userId) {
        void updateStreamInfo({
          id: data.id,
          videoUid: streamState.videoUID,
        }).then(() => {
          void refetch();
        });
      }
      setStarted(true);
    }
  }, [streamState, started, data, updateStreamInfo, userId, refetch]);

  return (
    <Layout title="Live Stream" canGoBack>
      <div className="lg:mx-auto lg:w-3/5">
        <div className="pt-2">
          {data && (
            <iframe
              className="aspect-video w-full rounded-md shadow-sm"
              src={`https://customer-${process.env
                .NEXT_PUBLIC_CLOUDFLARE_CODE!}.cloudflarestream.com/${
                data.isStreaming === false ? data.videoUid : data.cloudflareId
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
        {data &&
          data?.cloudflareKey !== "" &&
          data?.cloudflareUrl !== "" &&
          data.isStreaming !== false && (
            <>
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
              {data.isStreaming ? (
                <div
                  className="flex-x-center mb-6 cursor-pointer rounded-md bg-red-500 py-3 text-white"
                  onClick={onStopStreaming}
                >
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
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 019 14.437V9.564z"
                    />
                  </svg>
                  <div>End Streaming</div>
                </div>
              ) : (
                <div className="flex-x-center mb-6 rounded-md bg-gray-500 py-3 text-white">
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
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                    />
                  </svg>
                  <div>Please start streaming...</div>
                </div>
              )}
            </>
          )}
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
