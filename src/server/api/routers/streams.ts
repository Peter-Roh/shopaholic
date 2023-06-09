import { createTRPCRouter, privateProcedure } from "../trpc";
import {
  streamCreateInput,
  streamGetManyInput,
  getStreamByIdInput,
} from "../schema";
import type { cloudflareStream } from "@/types/cloudflare";

export const streamRouter = createTRPCRouter({
  create: privateProcedure
    .input(streamCreateInput)
    .mutation(async ({ ctx, input }) => {
      const { title, description, userId } = input;

      const {
        result: {
          uid,
          rtmps: { streamKey, url },
        },
      } = (await (
        await fetch(
          `https://api.cloudflare.com/client/v4/accounts/${process.env
            .CLOUDFLARE_ACCOUND_ID!}/stream/live_inputs`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.CLOUDFLARE_STREAM_TOKEN!}`,
            },
            body: `{"meta": {"name": "${title}"},"recording": { "mode": "automatic", "timeoutSeconds" : 10 }}`,
          }
        )
      ).json()) as { result: cloudflareStream };

      const newStream = await ctx.prisma.stream.create({
        data: {
          title,
          description,
          user: {
            connect: {
              id: userId,
            },
          },
          cloudflareId: uid,
          cloudflareKey: streamKey,
          cloudflareUrl: url,
        },
      });

      return {
        id: newStream.id,
      };
    }),
  getMany: privateProcedure
    .input(streamGetManyInput)
    .mutation(async ({ ctx, input }) => {
      const { page } = input;

      const streams = await ctx.prisma.stream.findMany({
        include: {
          user: {
            select: {
              name: true,
              avatar: true,
            },
          },
        },
        take: 20,
        skip: 20 * page,
      });

      return streams;
    }),
  getById: privateProcedure
    .input(getStreamByIdInput)
    .query(async ({ ctx, input }) => {
      const { id, userId } = input;

      const stream = await ctx.prisma.stream.findUnique({
        where: {
          id,
        },
        include: {
          messages: {
            select: {
              id: true,
              message: true,
              createdAt: true,
              updatedAt: true,
              user: {
                select: {
                  id: true,
                  avatar: true,
                  name: true,
                },
              },
            },
          },
        },
      });

      const isOwner = stream?.userId === userId;

      if (stream && !isOwner) {
        stream.cloudflareKey = "";
        stream.cloudflareUrl = "";
      }

      return stream;
    }),
});
