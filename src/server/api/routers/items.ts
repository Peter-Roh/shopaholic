import { TRPCError } from "@trpc/server";
import { getManyInput, itemsInput } from "../schema";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { ratelimit } from "@/server/ratelimiter";

export const itemsRouter = createTRPCRouter({
  add: privateProcedure.input(itemsInput).mutation(async ({ ctx, input }) => {
    const {
      name,
      image,
      price,
      description,
      userId,
      categoryId,
      subcategoryId,
    } = input;

    const { success } = await ratelimit.limit(userId.toString());

    if (!success) {
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: "Too many requests have been made.",
      });
    }

    const item = await ctx.prisma.item.create({
      data: {
        name,
        image,
        price,
        description,
        user: {
          connect: {
            id: userId,
          },
        },
        category: {
          connect: {
            id: categoryId,
          },
        },
        subcategory: {
          connect: {
            id: subcategoryId,
          },
        },
      },
    });

    return item;
  }),
  getMany: privateProcedure
    .input(getManyInput)
    .query(async ({ ctx, input }) => {
      const { categoryId, subcategoryId } = input;

      const items =
        categoryId !== -1 || subcategoryId !== -1
          ? await ctx.prisma.item.findMany({
              where: {
                categoryId: categoryId !== -1 ? categoryId : undefined,
                subcategoryId: subcategoryId !== -1 ? subcategoryId : undefined,
              },
            })
          : await ctx.prisma.item.findMany();

      return items;
    }),
});
