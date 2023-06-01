import { ratelimit } from "@/server/ratelimiter";
import { toggleLikeInput, watchlistInput } from "../schema";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const favoriteRouter = createTRPCRouter({
  toggleLike: privateProcedure
    .input(toggleLikeInput)
    .mutation(async ({ ctx, input }) => {
      const { userId, itemId } = input;

      const { success } = await ratelimit.limit(ctx.userId.toString());

      if (!success) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "Too many requests have been made.",
        });
      }

      const exists = await ctx.prisma.fav.findFirst({
        where: {
          userId,
          itemId,
        },
      });

      if (exists) {
        await ctx.prisma.fav.delete({
          where: {
            id: exists.id,
          },
        });
      } else {
        await ctx.prisma.fav.create({
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
          },
        });
      }
    }),
  watchlist: privateProcedure
    .input(watchlistInput)
    .mutation(({ ctx, input }) => {
      const { page } = input;
      const favs = ctx.prisma.user.findFirst({
        where: {
          id: ctx.userId,
        },
        select: {
          favs: {
            include: {
              item: {
                include: {
                  _count: {
                    select: {
                      favs: true,
                      comments: true,
                    },
                  },
                },
              },
            },
            take: 20,
            skip: 20 * page,
          },
        },
      });

      return favs;
    }),
});
