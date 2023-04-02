import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { category2Input, category3Input } from "../schema";

export const categoriesRouter = createTRPCRouter({
  getCategory1: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.category1.findMany();
  }),
  getCategory2: publicProcedure
    .input(category2Input)
    .query(async ({ ctx, input }) => {
      const { category1Id } = input;

      return await ctx.prisma.category2.findMany({
        where: {
          category1Id,
        },
      });
    }),
  getCategory3: publicProcedure
    .input(category3Input)
    .query(async ({ ctx, input }) => {
      const { category2Id } = input;

      return await ctx.prisma.category3.findMany({
        where: {
          category2Id,
        },
      });
    }),
});
