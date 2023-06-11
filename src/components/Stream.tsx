import type { Prettify, Unpacked } from "@/types/common";
import { type RouterOutputs } from "@/utils/api";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import DefaultUser from "../../public/default_user.png";

type Stream = NonNullable<Unpacked<RouterOutputs["stream"]["getMany"]>>;
type StreamProps = Prettify<
  Pick<Stream, "id" | "title" | "thumbnail"> & Pick<Stream, "user">["user"]
>;

const Stream: NextPage<StreamProps> = ({
  id,
  title,
  name,
  avatar,
  thumbnail,
}) => {
  return (
    <Link href={`/live/${id}`}>
      <div className="pt-2">
        {thumbnail === "" ? (
          <div className="aspect-video w-full rounded-md bg-slate-400" />
        ) : (
          <div className="relative aspect-video w-full">
            <Image
              alt="thumbnail"
              src={thumbnail}
              fill={true}
              className="rounded-md"
            />
          </div>
        )}
        <div className="mt-2 flex items-center justify-between">
          <p className="text-lg font-medium text-gray-700">{title}</p>
          <div className="flex items-center">
            <div className="relative mr-2 h-8 w-8 rounded-full">
              {avatar ? (
                <Image
                  alt="avatar"
                  src={`https://imagedelivery.net/21n4FpHfRA-Vp-3T4t5U8Q/${avatar}/avatar`}
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
            <span>{name}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Stream;
