import { TRPCError } from "@trpc/server";
import { createPurchaseInput, getManyPurchaseInput } from "../schema";
import { createTRPCRouter, privateProcedure } from "../trpc";

export const purchaseRouter = createTRPCRouter({
  create: privateProcedure
    .input(createPurchaseInput)
    .mutation(async ({ ctx, input }) => {
      const { userId } = input;

      const items = await ctx.prisma.user.findFirst({
        where: {
          id: userId,
        },
        select: {
          cart: {
            include: {
              item: true,
            },
          },
        },
      });

      if (!items) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Item Not Found.",
        });
      }

      await ctx.prisma.cartItem.deleteMany({
        where: {
          userId,
        },
      });

      const order = await ctx.prisma.order.create({
        data: {
          orderState: "CHECKING",
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      items.cart.map(async (item) => {
        await ctx.prisma.orderItem.create({
          data: {
            qty: item.qty,
            itemId: item.itemId,
            orderId: order.id,
            userId,
          },
        });
      });
    }),
  getMany: privateProcedure
    .input(getManyPurchaseInput)
    .mutation(async ({ ctx, input }) => {
      const { page } = input;

      const orders = await ctx.prisma.order.findMany({
        include: {
          orderItems: {
            include: {
              item: true,
            },
          },
        },
        take: 10,
        skip: 10 * page,
      });

      return {
        orders,
      };
    }),
});
