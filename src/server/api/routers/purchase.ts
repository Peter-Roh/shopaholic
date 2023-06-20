import { TRPCError } from "@trpc/server";
import {
  createPurchaseInput,
  getManyPurchaseInput,
  reportInput,
} from "../schema";
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

        await ctx.prisma.user.update({
          where: {
            id: item.item.userId,
          },
          data: {
            soldItems: {
              create: {
                qty: item.qty,
                orderId: order.id,
                itemId: item.itemId,
              },
            },
          },
        });
      });
    }),
  report: privateProcedure
    .input(reportInput)
    .mutation(async ({ ctx, input }) => {
      const { year } = input;

      const soldItems = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.userId,
        },
        select: {
          soldItems: {
            where: {
              AND: [
                {
                  createdAt: {
                    gte: new Date(year, 0, 1),
                  },
                },
                {
                  createdAt: {
                    lte: new Date(year + 1, 0, 1),
                  },
                },
              ],
            },
          },
        },
      });

      return {
        soldItems,
      };
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
