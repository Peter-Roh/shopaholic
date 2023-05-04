import Item from "@/components/Item";
import Layout from "@/components/Layout";
import { api } from "@/utils/api";
import type { NextPage } from "next";

const WatchList: NextPage = () => {
  const { data } = api.favorite.watchlist.useQuery();

  return (
    <Layout title="Watchlist" canGoBack>
      <div className="mb-8 flex w-full flex-col space-y-2 divide-y lg:mx-auto lg:w-3/5">
        {data && data.favs.length === 0 ? (
          <>
            <div className="flex-y-center mt-2 text-gray-600">
              Item not found.
            </div>
          </>
        ) : (
          data?.favs.map((item) => {
            return (
              <Item
                key={item.item.id}
                id={item.item.id}
                name={item.item.name}
                description={item.item.description}
                price={item.item.price}
                image={item.item.image}
                likes={item.item._count.favs}
              />
            );
          })
        )}
      </div>
    </Layout>
  );
};

export default WatchList;
