import type { NextPage } from "next";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { api } from "@/utils/api";
import type { Category, Subcategory } from "@prisma/client";
import { useDispatch } from "react-redux";
import {
  reset,
  saveCategoryId,
  saveSubcategoryId,
} from "@/redux/categorySlice";

const CategoryBar: NextPage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [category, setCategory] = useState<Category>();
  const [subcategory, setSubcategory] = useState<Subcategory>();
  const div1 = useRef<HTMLDivElement>(null);
  const div2 = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const { data: data1 } = api.categories.getCategory.useQuery();
  const { data: data2 } = api.categories.getSubcategory.useQuery(
    {
      categoryId: category ? category.id : -1,
    },
    {
      enabled: category !== undefined,
    }
  );

  const handleDropdownClose = useCallback(
    (e: MouseEvent) => {
      if (
        dropdownOpen &&
        (!div1.current || !div1.current.contains(e.target as Node)) &&
        (!div2.current || !div2.current.contains(e.target as Node))
      ) {
        setDropdownOpen(false);
      }
    },
    [dropdownOpen, div1, div2]
  );

  useEffect(() => {
    window.addEventListener("click", handleDropdownClose);

    return () => {
      window.removeEventListener("click", handleDropdownClose);
    };
  }, [handleDropdownClose]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handleCategory = useCallback(
    (elt: Category) => {
      setCategory(elt);
      dispatch(saveCategoryId(elt.id));
      setSubcategory(undefined);
    },
    [dispatch]
  );

  const handleSubcategory = useCallback(
    (elt: Subcategory) => {
      setSubcategory(elt);
      dispatch(saveSubcategoryId(elt.id));
      setDropdownOpen(false);
    },
    [dispatch]
  );

  return (
    <>
      <div
        ref={div1}
        className="no-scrollbar cursor-pointer overflow-x-scroll border-b bg-white py-3 text-lg font-medium dark:bg-slate-800"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <div className="mx-auto flex h-max items-center justify-start dark:text-slate-200 lg:w-3/5">
          <div className="ml-4">|</div>
          <div className="mx-2 flex flex-1 items-center justify-start whitespace-nowrap">
            <p>{category?.name ?? "Category"}</p>
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
          <div className="ml-2 flex flex-1 items-center justify-start whitespace-nowrap">
            <p>{subcategory?.name ?? "Subcategory"}</p>
          </div>
          <div className="mr-2">
            {dropdownOpen ? (
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
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            ) : (
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
            )}
          </div>
        </div>
      </div>
      <div
        ref={div2}
        className={`w-full rounded-b-sm bg-white py-3 px-4 shadow-md dark:bg-slate-800 ${
          dropdownOpen ? "block" : "hidden"
        }`}
      >
        <div className="mx-auto flex space-x-1 lg:w-3/5">
          <div className="flex-1 space-y-1">
            {data1?.map((elt1) => {
              return (
                <div
                  key={elt1.id}
                  className={`cursor-pointer px-2 py-1 dark:text-slate-200 ${
                    category && category.name === elt1.name
                      ? "bg-cyan-500 font-semibold text-white"
                      : "hover:bg-slate-200"
                  }`}
                  onClick={() => handleCategory(elt1)}
                >
                  {elt1.name}
                </div>
              );
            })}
          </div>
          <div className="flex-1 space-y-1">
            {data2?.map((elt2) => {
              return (
                <div
                  key={elt2.id}
                  className={`cursor-pointer px-2 py-1 dark:text-slate-200 ${
                    subcategory && subcategory.name === elt2.name
                      ? "bg-cyan-500 font-semibold text-white"
                      : "hover:bg-slate-200"
                  }`}
                  onClick={() => handleSubcategory(elt2)}
                >
                  {elt2.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(CategoryBar);
