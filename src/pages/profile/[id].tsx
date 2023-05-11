import type { NextPage } from "next";
import Layout from "@/components/Layout";
import { api } from "@/utils/api";
import type { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import Image from "next/image";
import DefaultUser from "../../../public/default_user.png";
import Item from "@/components/Item";

interface ParsedUrlQueryForPage extends ParsedUrlQuery {
  id: string;
}

const Profile: NextPage = () => {
  const router = useRouter();
  const { id } = router.query as ParsedUrlQueryForPage;
  const { data } = api.users.getById.useQuery(
    { userId: parseInt(id) },
    {
      enabled: id !== undefined,
      onError: () => void router.push("/"),
    }
  );

  return (
    <Layout title="Profile" hasTabBar canGoBack>
      <div className="lg:mx-auto lg:w-3/5">
        <div className="mt-4 flex items-center space-x-5">
          <div className="relative h-20 w-20 rounded-full">
            {data?.avatar ? (
              <Image
                alt="profile"
                className="rounded-full"
                src={`https://imagedelivery.net/21n4FpHfRA-Vp-3T4t5U8Q/${data.avatar}/avatar`}
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
                {data?.name}
              </span>
              <span className="text-xs text-gray-500">{data?.email}</span>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <span className="text-lg font-semibold text-cyan-500">
            Selling Items
          </span>
          <div className="flex flex-col space-y-2 divide-y">
            {data?.items.map((item) => {
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
