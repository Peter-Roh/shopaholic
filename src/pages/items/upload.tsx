import type { NextPage } from "next";
import Layout from "@/components/Layout";
import { type RouterInputs, api } from "@/utils/api";
import { useEffect, useState } from "react";
import type { Category, Subcategory } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { itemsInput } from "@/server/api/schema";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import useUser from "@/libs/client/useUser";
import { useRouter } from "next/router";

type FormValues = RouterInputs["items"]["add"];

const Upload: NextPage = () => {
  const { data } = useUser();
  const router = useRouter();
  const [category, setCategory] = useState<Category>();
  const [subcategory, setSubcategory] = useState<Subcategory>();

  const { data: data1 } = api.categories.getCategory.useQuery();
  const { data: data2 } = api.categories.getSubcategory.useQuery(
    {
      categoryId: category ? category.id : -1,
    },
    {
      enabled: category !== undefined,
      staleTime: 1000 * 10, // 10 sec
    }
  );

  const { mutateAsync, isSuccess } = api.items.add.useMutation();

  const { register, handleSubmit, setValue } = useForm<FormValues>({
    resolver: zodResolver(itemsInput),
  });

  const onValid: SubmitHandler<FormValues> = async ({
    name,
    image,
    price,
    description,
    userId,
    categoryId,
    subcategoryId,
  }) => {
    if (!isSuccess) {
      await mutateAsync({
        name,
        image,
        price,
        description,
        userId,
        categoryId,
        subcategoryId,
      }).then(() => {
        void router.replace("/");
      });
    }
  };

  const onError = (errors: object) => {
    if (Object.keys(errors).includes("name")) {
      toast.error("Please put a name for the item.");
    } else if (Object.keys(errors).includes("categoryId")) {
      toast.error("Please select category for the item.");
    } else if (Object.keys(errors).includes("subcategoryId")) {
      toast.error("Please select subcategory for the item.");
    } else if (Object.keys(errors).includes("price")) {
      toast.error("Please put a valid price for the item.");
    } else if (Object.keys(errors).includes("description")) {
      toast.error("Please put a description for the item.");
    }
  };

  useEffect(() => {
    register("image", {
      required: true,
    });
    register("userId", {
      required: true,
      valueAsNumber: true,
    });
    register("categoryId", {
      required: true,
      valueAsNumber: true,
    });
    register("subcategoryId", {
      required: true,
      valueAsNumber: true,
    });
  }, [register]);

  useEffect(() => {
    if (data) {
      setValue("userId", data.id);
    }

    setValue("image", ""); // TODO
  }, [setValue, data]);

  return (
    <Layout title="Upload" canGoBack>
      <div className="lg:mx-auto lg:w-3/5">
        <form onSubmit={handleSubmit(onValid, onError)}>
          <div className="flex-x-center mb-6 w-full">
            <label className="flex-x-center aspect-[4/3] w-full cursor-pointer rounded-md border-2 border-dashed border-gray-300 text-gray-600 hover:border-cyan-500 hover:text-cyan-500">
              <svg
                className="h-12 w-12"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input className="hidden" type="file" />
            </label>
          </div>
          {
            // * name
          }
          <div>
            <div>
              <label className="mb-2 block text-base font-medium text-gray-700">
                Name
              </label>
            </div>
            <div className="mb-4 w-full">
              <input
                {...register("name", {
                  required: true,
                  setValueAs: (v: string) => (v === "" ? null : v),
                })}
                type="text"
                className="ring-focus w-full appearance-none rounded-md border border-gray-400 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-cyan-500"
                placeholder="name"
              />
            </div>
          </div>
          {
            // * category
          }
          <div className="mb-4 w-full">
            <label
              className="mb-2 block text-base font-medium text-gray-700"
              htmlFor="category"
            >
              Category
            </label>
            <div className="w-full">
              <div className="dropdown-bottom dropdown w-full">
                <label
                  tabIndex={0}
                  className="flex-x-center block w-full rounded-md border border-transparent bg-cyan-500 py-2 px-4 text-center text-sm font-medium text-white hover:bg-cyan-600"
                >
                  {category ? category.name : "Select category"}
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu rounded-box w-full bg-base-100 p-2 shadow-md"
                >
                  {data1?.map((elt) => {
                    return (
                      <li
                        key={elt.id}
                        className="py-2 px-4 font-medium hover:bg-slate-200"
                        onClick={() => {
                          const elem = document.activeElement;
                          if (elem && elem instanceof HTMLElement) {
                            elem?.blur(); // dropdown 클릭 후에 닫히도록
                          }
                          setCategory(elt);
                          setValue("categoryId", elt.id);
                          setSubcategory(undefined);
                        }}
                      >
                        {elt.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          {
            // * subcategory
          }
          {category && data2 && data2.length > 0 && (
            <div className="mb-4 w-full">
              <label
                className="mb-2 block text-base font-medium text-gray-700"
                htmlFor="category"
              >
                Subcategory
              </label>
              <div className="w-full">
                <div className="dropdown-bottom dropdown w-full">
                  <label
                    tabIndex={0}
                    className="flex-x-center block w-full rounded-md border border-transparent bg-cyan-500 py-2 px-4 text-center text-sm font-medium text-white hover:bg-cyan-600"
                  >
                    {subcategory ? subcategory.name : "Select subcategory"}
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu rounded-box w-full bg-base-100 p-2 shadow-md"
                  >
                    {data2.map((elt) => {
                      return (
                        <li
                          key={elt.id}
                          className="py-2 px-4 font-medium hover:bg-slate-200"
                          onClick={() => {
                            const elem = document.activeElement;
                            if (elem && elem instanceof HTMLElement) {
                              elem?.blur(); // dropdown 클릭 후에 닫히도록
                            }
                            setSubcategory(elt);
                            setValue("subcategoryId", elt.id);
                          }}
                        >
                          {elt.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          )}
          {
            // * price
          }
          <div className="mb-4">
            <label
              className="mb-2 block text-base font-medium text-gray-700"
              htmlFor="price"
            >
              Price
            </label>
            <div className="flex-x-center relative rounded-md shadow-md">
              <div className="flex-x-center pointer-events-none absolute left-0 pl-3">
                <span className="text-sm text-gray-500">$</span>
              </div>
              <input
                {...register("price", {
                  required: true,
                  validate: {
                    positive: (v) => v > 0,
                  },
                  setValueAs: (v) => (v === "" ? null : v * 100), // dollar 소수점 처리
                })}
                id="price"
                className="ring-focus w-full appearance-none rounded-md border border-gray-400 px-3 py-2 pl-7 placeholder-gray-400 shadow-sm focus:border-cyan-500"
                type="text"
                placeholder="0.00"
              />
              <div className="flex-x-center pointer-events-none absolute right-0 pr-3">
                <span className="text-gray-500">USD</span>
              </div>
            </div>
          </div>
          {
            // * description
          }
          <div className="mb-4">
            <label className="mb-2 block text-base font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register("description", {
                required: true,
                setValueAs: (v: string) => (v === "" ? null : v),
              })}
              className="ring-focus w-full rounded-md border-gray-500 shadow-sm focus:border-cyan-500"
              rows={4}
            />
          </div>
          {
            // * upload button
          }
          <button className="ring-focus-2 mb-2 w-full rounded-md border border-transparent bg-cyan-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-cyan-600">
            Upload Product!
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Upload;
