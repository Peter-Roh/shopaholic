import { itemsInput } from "../schema";
import { createTRPCRouter, privateProcedure } from "../trpc";

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
});
