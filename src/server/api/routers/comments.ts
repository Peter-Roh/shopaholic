import { ratelimit } from "@/server/ratelimiter";
import {
  commentAddInput,
  commentDeleteInput,
  commentGetByItemInput,
  toggleCommentLikeInput,
} from "../schema";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const commentRouter = createTRPCRouter({
  add: privateProcedure
    .input(commentAddInput)
    .mutation(async ({ ctx, input }) => {
      const { userId, itemId, comment } = input;

      const { success } = await ratelimit.limit(ctx.userId.toString());

      if (!success) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "Too many requests have been made.",
        });
      }

      await ctx.prisma.comment.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          item: {
            connect: {
              id: itemId,
            },
          },
          comment,
        },
      });
    }),
  delete: privateProcedure
    .input(commentDeleteInput)
    .mutation(async ({ ctx, input }) => {
      const { userId, commentId } = input;

      const comment = await ctx.prisma.comment.findFirst({
        where: {
          id: commentId,
        },
      });

      if (!comment) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Comment Not Found.",
        });
      }

      if (comment.userId !== userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "unauthorized to delete this comment",
        });
      }

      await ctx.prisma.comment.delete({
        where: {
          id: commentId,
        },
      });
    }),
  getByItem: privateProcedure
    .input(commentGetByItemInput)
    .query(async ({ ctx, input }) => {
      const { itemId } = input;

      const comments = await ctx.prisma.comment.findMany({
        where: {
          itemId,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
          likes: {
            select: {
              userId: true,
            },
            where: {
              userId: {
                equals: ctx.userId,
              },
            },
          },
          _count: {
            select: {
              likes: true,
            },
          },
        },
      });

      return comments;
    }),
  toggleLike: privateProcedure
    .input(toggleCommentLikeInput)
    .mutation(async ({ ctx, input }) => {
      const { userId, commentId } = input;

      const { success } = await ratelimit.limit(ctx.userId.toString());

      if (!success) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "Too many requests have been made.",
        });
      }

      const exists = await ctx.prisma.commentLike.findFirst({
        where: {
          commentId: commentId,
          userId,
        },
      });

      if (exists) {
        await ctx.prisma.commentLike.delete({
          where: {
            id: exists.id,
          },
        });
      } else {
        await ctx.prisma.commentLike.create({
          data: {
            user: {
              connect: {
                id: userId,
              },
            },
            comment: {
              connect: {
                id: commentId,
              },
            },
          },
        });
      }
    }),
});
