import { createTRPCRouter, privateProcedure } from "../trpc";
import {
  streamCreateInput,
  streamGetManyInput,
  getStreamByIdInput,
  stopStreamInput,
  startStreamingInput,
  watchStreamingInput,
} from "../schema";
import type {
  cloudflareStream,
  cloudflareWatchStream,
} from "@/types/cloudflare";
import { ratelimit } from "@/server/ratelimiter";
import { TRPCError } from "@trpc/server";

export const streamRouter = createTRPCRouter({
  ready: privateProcedure
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
          videoUid: "",
          thumbnail: "",
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
  watch: privateProcedure
    .input(watchStreamingInput)
    .query(async ({ input }) => {
      const { uid } = input;

      const { videoUID, live } = (await (
        await fetch(
          `https://customer-${process.env
            .CLOUDFLARE_CODE!}.cloudflarestream.com/${uid}/lifecycle
        `,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${process.env.CLOUDFLARE_STREAM_TOKEN!}`,
            },
          }
        )
      ).json()) as cloudflareWatchStream;

      return {
        live,
        videoUID,
      };
    }),
  start: privateProcedure
    .input(startStreamingInput)
    .mutation(async ({ ctx, input }) => {
      const { id, videoUid } = input;

      await ctx.prisma.stream.update({
        where: {
          id,
        },
        data: {
          isStreaming: true,
          videoUid,
          thumbnail: `https://customer-${process.env
            .CLOUDFLARE_CODE!}.cloudflarestream.com/${videoUid}/thumbnails/thumbnail.jpg`,
        },
      });
    }),
  stop: privateProcedure
    .input(stopStreamInput)
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      await ctx.prisma.stream.update({
        where: {
          id,
        },
        data: {
          isStreaming: false,
        },
      });
    }),
  getMany: privateProcedure
    .input(streamGetManyInput)
    .mutation(async ({ ctx, input }) => {
      const { page } = input;

      const streams = await ctx.prisma.stream.findMany({
        where: {
          OR: [
            {
              isStreaming: true,
            },
            {
              isStreaming: false,
            },
          ],
        },
        include: {
          user: {
            select: {
              name: true,
              avatar: true,
            },
          },
        },
        take: 10,
        skip: 10 * page,
      });

      return streams;
    }),
  getById: privateProcedure
    .input(getStreamByIdInput)
    .query(async ({ ctx, input }) => {
      const { id, userId } = input;

      const { success } = await ratelimit.limit(userId.toString());

      if (!success) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "Too many requests have been made.",
        });
      }

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

      if (!stream) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Stream Not Found.",
        });
      }

      const isOwner = stream?.userId === userId;

      if (stream && !isOwner) {
        stream.cloudflareKey = "";
        stream.cloudflareUrl = "";
      }

      return stream;
    }),
});
