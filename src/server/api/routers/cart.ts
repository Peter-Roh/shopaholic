import { ratelimit } from "@/server/ratelimiter";
import { cartAddInput, cartDeleteInput } from "../schema";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const cartRouter = createTRPCRouter({
  add: privateProcedure.input(cartAddInput).mutation(async ({ ctx, input }) => {
    const { userId, itemId, qty } = input;

    const { success } = await ratelimit.limit(ctx.userId.toString());

    if (!success) {
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: "Too many requests have been made.",
      });
    }

    const items = await ctx.prisma.cartItem.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });

    const exists = await ctx.prisma.cartItem.findFirst({
      where: {
        userId,
        itemId,
      },
    });

    if (exists) {
      const cartItem = await ctx.prisma.cartItem.update({
        where: {
          id: exists.id,
        },
        data: {
          qty: exists.qty + qty,
        },
      });
      return cartItem;
    } else {
      if (items.length >= 5) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cart is full",
        });
      }

      const cartItem = await ctx.prisma.cartItem.create({
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
          qty,
        },
      });
      return cartItem;
    }
  }),
  delete: privateProcedure
    .input(cartDeleteInput)
    .mutation(async ({ ctx, input }) => {
      const { cartItemId } = input;
      const cartItem = await ctx.prisma.cartItem.findFirst({
        where: {
          id: cartItemId,
        },
      });

      if (cartItem) {
        await ctx.prisma.cartItem.delete({
          where: {
            id: cartItem.id,
          },
        });
      }
    }),
  getMyCart: privateProcedure.query(async ({ ctx }) => {
    const cart = ctx.prisma.user.findFirst({
      where: {
        id: ctx.userId,
      },
      select: {
        cart: {
          include: {
            item: true,
          },
        },
      },
    });

    return cart;
  }),
});
