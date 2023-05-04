import { toggleLikeInput } from "../schema";
import { createTRPCRouter, privateProcedure } from "../trpc";

export const favoriteRouter = createTRPCRouter({
  toggleLike: privateProcedure
    .input(toggleLikeInput)
    .mutation(async ({ ctx, input }) => {
      const { userId, itemId } = input;
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
  watchlist: privateProcedure.query(({ ctx }) => {
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
                  },
                },
              },
            },
          },
        },
      },
    });

    return favs;
  }),
});
