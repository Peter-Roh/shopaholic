import { TRPCError } from "@trpc/server";
import { itemsInput } from "../schema";
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
});
