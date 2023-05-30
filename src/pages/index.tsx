import type { NextPage } from "next";
import Layout from "@/components/Layout";
import Item from "@/components/Item";
import Link from "next/link";
import { api } from "@/utils/api";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import CarouselComponent from "@/components/Carousel";

const Home: NextPage = () => {
  const value = useSelector((state: RootState) => state.category);
  const { data } = api.items.getMany.useQuery({
    categoryId: value.categoryId,
    subcategoryId: value.subcategoryId,
    page: 0,
  });

  return (
    <Layout title="Home" hasTabBar canGoBack>
      <div className="mt-14 flex w-full flex-col justify-start lg:mx-auto lg:w-3/5">
        <CarouselComponent />
        <div className="mt-4 flex flex-col space-y-2 divide-y">
          {data && data.length === 0 ? (
            <>
              <div className="flex-y-center mt-2 text-gray-600">
                Item not found.
              </div>
            </>
          ) : (
            data?.map((item) => {
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
            })
          )}
        </div>
      </div>
      <Link href="/items/upload">
        <button className="fixed bottom-28 right-6 z-10 cursor-pointer rounded-full border-transparent bg-cyan-400 p-3 text-white shadow-xl transition-colors hover:bg-cyan-500 lg:hidden">
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </Link>
    </Layout>
  );
};

export default Home;
