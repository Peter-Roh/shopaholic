import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { subcategoryInput } from "../schema";

export const categoriesRouter = createTRPCRouter({
  getCategory: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.category.findMany();
  }),
  getSubcategory: publicProcedure
    .input(subcategoryInput)
    .query(async ({ ctx, input }) => {
      const { categoryId } = input;
      return await ctx.prisma.subcategory.findMany({
        where: {
          categoryId,
        },
      });
    }),
});
