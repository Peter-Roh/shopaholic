import type { GetServerSidePropsContext, NextPage } from "next";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { type RouterInputs, api, type RouterOutputs } from "@/utils/api";
import Image from "next/image";
import DefaultUser from "#/default_user.png";
import { type ChangeEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { getPrice } from "@/utils/common";
import { toast } from "react-hot-toast";
import Comment from "@/components/Comment";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentAddInput } from "@/server/api/schema";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "@/components/Loader";
import { withSessionSsr } from "@/libs/server/sessions";
import { createHelpers } from "@/libs/server/helpers";
import type { TRPCError } from "@trpc/server";

type CommentsArray = RouterOutputs["comment"]["getByItem"]["comments"];
type FormValues = RouterInputs["comment"]["add"];

const ItemsDetail: NextPage<{ id: string; userId: number | undefined }> = ({
  id,
  userId,
}) => {
  const router = useRouter();
  const [qty, setQty] = useState(1);

  const { mutateAsync, isLoading: isAddLoading } = api.cart.add.useMutation();

  const { data } = api.items.getById.useQuery(
    {
      itemId: parseInt(id),
    },
    {
      enabled: id !== undefined,
      onError: () => void router.push("/"),
    }
  );
  const utils = api.useContext();

  const { mutateAsync: mutateDeleteAsync, isLoading: isDeleteLoading } =
    api.comment.delete.useMutation();

  // optimistic update
  const { mutate, isLoading } = api.favorite.toggleLike.useMutation({
    onMutate: async () => {
      await utils.items.getById.cancel({ itemId: parseInt(id) });
      const prevData = utils.items.getById.getData({ itemId: parseInt(id) });
      utils.items.getById.setData({ itemId: parseInt(id) }, (old) => {
        if (old === undefined) {
          return;
        }
        return {
          ...old,
          isLiked: !old.isLiked,
        };
      });
      return {
        prevData,
      };
    },
    onError: (err, newData, ctx) => {
      utils.items.getById.setData({ itemId: parseInt(id) }, ctx?.prevData);
    },
    onSettled: () => {
      void utils.items.getById.invalidate({ itemId: parseInt(id) });
    },
  });

  const onLikeClick = useCallback(() => {
    if (!isLoading && userId) {
      mutate({ userId, itemId: parseInt(id) });
    }
  }, [id, userId, mutate, isLoading]);

  const onClickPlus = useCallback(() => {
    setQty((qty) => qty + 1);
  }, []);

  const onClickMinus = useCallback(() => {
    setQty((qty) => (qty > 1 ? qty - 1 : qty));
  }, []);

  const handleAddCart = async () => {
    if (!isAddLoading && userId) {
      await mutateAsync({ userId, itemId: parseInt(id), qty })
        .then(() => {
          toast.success("item was added to your cart!");
        })
        .catch((err: TRPCError) => {
          toast.error(err.message);
        });
    }
  };

  // comment
  const {
    register,
    handleSubmit,
    setValue,
    resetField,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<FormValues>({
    resolver: zodResolver(commentAddInput),
  });

  useEffect(() => {
    register("userId", {
      required: true,
      valueAsNumber: true,
    });
    register("itemId", {
      required: true,
      valueAsNumber: true,
    });
  }, [register]);

  useEffect(() => {
    if (userId) {
      setValue("userId", userId);
    }

    if (id) {
      setValue("itemId", parseInt(id));
    }
  }, [setValue, userId, id]);

  // textarea auto resize
  const textareaOnChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      e.target.style.height = "auto";
      e.target.style.height = `${e.target.scrollHeight}px`;
    },
    []
  );

  const {
    mutateAsync: mutateAddAsync,
    isSuccess,
    reset: resetMutation,
  } = api.comment.add.useMutation();

  const [commentsData, setCommentsData] = useState<CommentsArray>([]);
  const [page, setPage] = useState(0);

  const { data: comments, fetchNextPage } =
    api.comment.getByItem.useInfiniteQuery(
      {
        itemId: parseInt(id),
        limit: 20,
        skip: page,
      },
      {
        enabled: id !== undefined,
        onSuccess: (data) => {
          setCommentsData((prev) => {
            if (data) {
              return [...prev, ...data.pages[0]!.comments];
            }

            return prev;
          });
        },
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  useEffect(() => {
    setCommentsData([]);
    setPage(0);
  }, [id]);

  const getMore = useCallback(() => {
    setPage((p) => p + 1),
      () => {
        void fetchNextPage();
      };
  }, [fetchNextPage]);

  const onValid: SubmitHandler<FormValues> = async ({
    userId,
    itemId,
    comment,
  }) => {
    if (!isSuccess && comment !== "") {
      await mutateAddAsync({ userId, itemId, comment }).then((data) => {
        if (data) {
          setCommentsData((prev) => [data, ...prev]);
        }
      });
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(undefined, {
        keepValues: true,
      });
      resetField("comment");
      resetMutation();
    }
  }, [isSubmitSuccessful, reset, resetField, resetMutation]);

  const onError = (errors: object) => {
    if (Object.keys(errors).includes("comment")) {
      toast.error("Please write something as a comment.");
    }
  };

  // delete comment
  const handleOnDelete = useCallback(
    async (commentId: number) => {
      if (!isDeleteLoading && userId) {
        await mutateDeleteAsync({ userId, commentId }).then(() => {
          setCommentsData((prev) => prev.filter((elt) => elt.id !== commentId));
        });
      }
    },
    [mutateDeleteAsync, userId, isDeleteLoading]
  );

  // like comment - optimistic update
  const { mutate: mutateLikeComment, isLoading: isLikeCommentLoading } =
    api.comment.toggleLike.useMutation({
      onMutate: async ({ commentId }) => {
        await utils.comment.getByItem.cancel();

        commentsData.map((elt) => {
          if (elt.id === commentId) {
            if (elt.likes.length === 0 && userId) {
              elt.likes.push({ userId });
              elt._count.likes += 1;
            } else {
              elt.likes.shift();
              elt._count.likes -= 1;
            }
          }
        });

        return { commentsData };
      },
    });

  const onCommentLikeClick = useCallback(
    (commentId: number) => {
      if (!isLikeCommentLoading && userId) {
        mutateLikeComment({ userId, commentId });
      }
    },
    [mutateLikeComment, userId, isLikeCommentLoading]
  );

  return (
    <Layout title="Item" hasTabBar canGoBack>
      <div className="lg:mx-auto lg:w-3/5">
        <div>
          <div className="relative aspect-[4/3] w-full">
            {data ? (
              <Image
                alt="item"
                className="h-auto w-full object-contain"
                src={`https://imagedelivery.net/21n4FpHfRA-Vp-3T4t5U8Q/${data.image}/public`}
                sizes="100vw"
                priority={true}
                fill
              />
            ) : null}
          </div>
          <div className="flex flex-col">
            <span className="mt-3 text-3xl font-bold text-gray-900 dark:text-slate-100">
              {data?.name}
            </span>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-3xl text-gray-900 dark:text-slate-100">
                ${data ? getPrice(data.price) : null}
              </span>
              <div className="flex-x-center space-x-3 text-xl">
                <div
                  className="flex-x-center cursor-pointer rounded-md border py-1 px-3 hover:bg-gray-100 dark:text-slate-100 dark:hover:bg-slate-500"
                  onClick={onClickMinus}
                >
                  <span>-</span>
                </div>
                <div>
                  <span className="dark:text-slate-100">{qty}</span>
                </div>
                <div>
                  <span
                    className="flex-x-center cursor-pointer rounded-md border py-1 px-3 hover:bg-gray-100 dark:text-slate-100 dark:hover:bg-slate-500"
                    onClick={onClickPlus}
                  >
                    +
                  </span>
                </div>
              </div>
            </div>
            <p className="my-6 text-base text-gray-700 dark:text-slate-200">
              {data?.description}
            </p>
          </div>
        </div>
        <div>
          <div className="flex-x-center space-x-2">
            <button
              onClick={handleAddCart}
              className="ring-focus-2 flex-x-center flex-1 rounded-md bg-lime-500 py-2 font-medium text-white hover:bg-lime-600 focus:ring-lime-500"
            >
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
            <button
              onClick={onLikeClick}
              className={`flex-x-center ring-focus-2 rounded-md border p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:bg-white ${
                data?.isLiked ? "" : "hover:text-red-700"
              }`}
            >
              {data?.isLiked ? (
                <svg
                  className="icon text-red-700"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              ) : (
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
              )}
            </button>
          </div>
        </div>
        <div className="flex cursor-pointer items-center space-x-3 border-b py-3">
          <div className="relative h-12 w-12 rounded-full">
            {data?.user.avatar ? (
              <Image
                alt="avatar"
                src={`https://imagedelivery.net/21n4FpHfRA-Vp-3T4t5U8Q/${data.user.avatar}/avatar`}
                sizes="48px"
                fill={true}
                className="rounded-full"
              />
            ) : (
              <Image
                alt="no-profile"
                src={DefaultUser}
                placeholder="blur"
                sizes="48px"
                fill={true}
                className="rounded-full"
              />
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-slate-200">
              {data?.user?.name}
            </p>
            {data && data.user.id ? (
              <Link href={`/profile/${data.user.id}`}>
                <p className="text-xs font-medium text-gray-500 dark:text-slate-400">
                  View profile &rarr;
                </p>
              </Link>
            ) : null}
          </div>
        </div>
        <div>
          {data?.related && data.related.length > 0 ? (
            <p className="mt-4 text-2xl font-bold text-gray-900 dark:text-slate-100">
              Similar items
            </p>
          ) : null}
          <div className="mt-4 mb-8 grid grid-cols-2 gap-4">
            {data?.related.map((relatedItem) => {
              return (
                <Link key={relatedItem.id} href={`/items/${relatedItem.id}`}>
                  <div>
                    <div className="relative mb-2 aspect-[4/3] w-full">
                      <Image
                        alt="item"
                        className="object-contain"
                        src={`https://imagedelivery.net/21n4FpHfRA-Vp-3T4t5U8Q/${relatedItem.image}/public`}
                        sizes="50vw"
                        fill
                      />
                    </div>
                    <p className="line-clamp-2 text-lg text-gray-900 dark:text-slate-100">
                      {relatedItem.name}
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-slate-200">
                      ${getPrice(relatedItem.price)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <form onSubmit={handleSubmit(onValid, onError)}>
          <div className="flex flex-col">
            <textarea
              {...register("comment", {
                required: true,
              })}
              rows={1}
              onChange={textareaOnChange}
              placeholder="Add comments..."
              className="no-scrollbar w-full appearance-none border-x-0 border-t-0 border-b border-b-gray-400 bg-inherit bg-opacity-30 px-3 py-2 placeholder-gray-400 focus:border-b-2 focus:border-b-cyan-500 focus:outline-none focus:ring-0 dark:text-slate-100"
            />
            <button className="ring-focus-2 ml-auto mt-2 rounded-3xl border-transparent bg-cyan-400 px-3 py-2 font-bold text-white shadow-sm hover:bg-cyan-500">
              Comment
            </button>
          </div>
        </form>
        <div className="mb-8 mt-2 flex flex-col items-start justify-start space-y-4">
          {comments && (
            <InfiniteScroll
              key={id}
              dataLength={commentsData.length}
              next={getMore}
              hasMore={comments.pages[0]!.hasMore}
              loader={<Loader />}
              scrollThreshold={0.5}
            >
              {commentsData.map((comment) => {
                return (
                  <Comment
                    key={comment.id}
                    id={comment.id}
                    comment={comment.comment}
                    isMine={comment.user.id === userId}
                    name={comment.user.name}
                    avatar={comment.user.avatar}
                    createdAt={comment.createdAt}
                    isLiked={comment.likes[0]?.userId === userId}
                    likes={comment._count.likes}
                    handleOnLike={onCommentLikeClick}
                    handleOnDelete={handleOnDelete}
                  />
                );
              })}
            </InfiniteScroll>
          )}
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = withSessionSsr(
  async (context: GetServerSidePropsContext) => {
    const id = context.params?.id as string;
    const { helpers, userId } = await createHelpers(context);

    await helpers.items.getById.prefetch({
      itemId: parseInt(id),
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

export default ItemsDetail;
