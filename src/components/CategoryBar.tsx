import type { NextPage } from "next";
import React, { useState } from "react";
import { api } from "@/utils/api";
import type { Category, Subcategory } from "@prisma/client";

const CategoryBar: NextPage = () => {
  const [category, setCategory] = useState<Category>();
  const [subcategory, setSubcategory] = useState<Subcategory>();

  const { data: data1 } = api.categories.getCategory.useQuery();
  const { data: data2 } = api.categories.getSubcategory.useQuery(
    {
      categoryId: category ? category.id : -1,
    },
    {
      enabled: category !== undefined,
    }
  );

  return (
    <div className="no-scrollbar overflow-x-scroll border-b bg-white py-3 text-lg font-medium text-gray-700">
      <div className="mx-auto flex h-max items-center justify-start lg:w-3/5">
        <div className="ml-4">|</div>
        <div className="ml-2 flex items-center justify-center whitespace-nowrap">
          <p>Category</p>
          <svg
            className="ml-1 h-4 w-4"
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
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
        <div>
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
        <div className="ml-2 flex items-center justify-center whitespace-nowrap">
          <p>Subcategory</p>
          <svg
            className="ml-1 h-4 w-4"
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
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CategoryBar);
