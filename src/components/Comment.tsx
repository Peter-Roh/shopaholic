import type { Prettify, Unpacked } from "@/types/common";
import type { RouterOutputs } from "@/utils/api";
import type { NextPage } from "next";
import Image from "next/image";
import DefaultUser from "../../public/default_user.png";

type Comment = Unpacked<RouterOutputs["comment"]["getByItem"]>;
type User = Comment["user"];
type CommentProps = Prettify<
  Pick<Comment, "id" | "comment" | "updatedAt"> &
    Pick<User, "name" | "avatar"> &
    Pick<Comment, "_count">["_count"] & {
      isMine: boolean;
      isLiked: boolean;
      handleOnLike: (commentId: number) => void;
      handleOnDelete: (commentId: number) => Promise<void>;
    }
>;

const Comment: NextPage<CommentProps> = ({
  id,
  comment,
  isMine,
  name,
  avatar,
  likes,
  isLiked,
  updatedAt,
  handleOnLike,
  handleOnDelete,
}) => {
  return (
    <div className="flex">
      <div className="relative h-12 w-12 rounded-full">
        {avatar ? (
          <Image
            alt="profile"
            className="rounded-full"
            src={`https://imagedelivery.net/21n4FpHfRA-Vp-3T4t5U8Q/${avatar}/avatar`}
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
      <div className="ml-4 flex flex-col">
        <div className="flex justify-start">
          <span className="text-gray-900 dark:text-slate-100">{name}</span>
          <span className="ml-2 flex items-end text-sm text-slate-500">
            1시간 전
          </span>
        </div>
        <div className="text-gray-900 dark:text-slate-100">{comment}</div>
        <div className="flex items-center justify-start text-gray-900 dark:text-slate-100">
          <div
            className="flex-x-center cursor-pointer"
            onClick={() => handleOnLike(id)}
          >
            {isLiked ? (
              <svg
                className="h-4 w-4 text-lime-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
            ) : (
              <svg
                className="h-4 w-4"
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
                  d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                />
              </svg>
            )}
            <span className="ml-1">{likes}</span>
          </div>
          {isMine ? (
            <div onClick={() => handleOnDelete(id)} className="cursor-pointer">
              <svg
                className="ml-2 h-4 w-4"
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
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Comment;
