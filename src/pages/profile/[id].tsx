import type { GetServerSidePropsContext, NextPage } from "next";
import Layout from "@/components/Layout";
import { type RouterOutputs, api } from "@/utils/api";
import { useRouter } from "next/router";
import Image from "next/image";
import DefaultUser from "#/default_user.png";
import Item from "@/components/Item";
import InfiniteScroll from "react-infinite-scroll-component";
import { useCallback, useState } from "react";
import Loader from "@/components/Loader";
import { withSessionSsr } from "@/libs/server/sessions";
import { createHelpers } from "@/libs/server/helpers";

type Unpacked<T> = T extends (infer U)[] ? U : T;
type ItemsArray = Unpacked<
  Pick<RouterOutputs["users"]["getById"], "user">
>["user"]["items"];

const Profile: NextPage<{ id: string }> = ({ id }) => {
  const router = useRouter();
  const [itemsData, setItemsData] = useState<ItemsArray>([]);
  const [page, setPage] = useState(0);
  const { data, fetchNextPage } = api.users.getById.useInfiniteQuery(
    {
      userId: parseInt(id),
      limit: 20,
      skip: page,
    },
    {
      onSuccess: (data) => {
        setItemsData((prev) => {
          if (data) {
            return [...prev, ...data.pages[0]!.user.items];
          }
          return prev;
        });
      },
      onError: () => void router.push("/"),
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const getMore = useCallback(() => {
    setPage((p) => p + 1),
      () => {
        void fetchNextPage();
      };
  }, [fetchNextPage]);

  return (
    <Layout title="Profile" hasTabBar canGoBack>
      <div className="lg:mx-auto lg:w-3/5">
        <div className="mt-4 flex items-center space-x-5">
          <div className="relative h-20 w-20 rounded-full">
            {data?.pages[0]!.user.avatar ? (
              <Image
                alt="profile"
                className="rounded-full"
                src={`https://imagedelivery.net/21n4FpHfRA-Vp-3T4t5U8Q/${data.pages[0].user.avatar}/avatar`}
                sizes="80px"
                fill
              />
            ) : (
              <Image
                alt="no-profile"
                className="rounded-full"
                src={DefaultUser}
                placeholder="blur"
                sizes="80px"
                fill
              />
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-gray-900 dark:text-slate-100">
                {data?.pages[0]!.user.name}
              </span>
              <span className="text-xs text-gray-500">
                {data?.pages[0]?.user?.email}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <span className="text-lg font-semibold text-cyan-500">
            Selling Items
          </span>
          <div className="flex flex-col space-y-2 divide-y">
            {data && (
              <InfiniteScroll
                dataLength={itemsData.length}
                next={getMore}
                hasMore={data.pages[0]!.hasMore}
                loader={<Loader />}
              >
                {itemsData.map((item) => {
                  return (
                    <Item
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      image={item.image}
                      favs={item._count.favs}
                      comments={item._count.comments}
                    />
                  );
                })}
              </InfiniteScroll>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = withSessionSsr(
  async (context: GetServerSidePropsContext) => {
    const id = context.params?.id as string;
    const { helpers } = await createHelpers(context);

    await helpers.users.getById.prefetchInfinite({
      userId: parseInt(id),
      limit: 20,
      skip: 0,
    });

    return {
      props: {
        trpcState: helpers.dehydrate(),
        id,
      },
    };
  }
);

export default Profile;
