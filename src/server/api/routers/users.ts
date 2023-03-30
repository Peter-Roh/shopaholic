import { privateProcedure } from "./../trpc";
import { TRPCError } from "@trpc/server";
import { confirmInput, enterInput } from "./../schema";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const usersRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
  me: privateProcedure.query(async ({ ctx }) => {
    const profile = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.userId,
      },
    });

    return profile;
  }),
  login: publicProcedure.input(enterInput).mutation(async ({ ctx, input }) => {
    const { email } = input;
    const name = email.split("@")[0] || "Anonymous"; // email 주소 앞부분을 이름으로
    const payload = Math.floor(100000 + Math.random() * 900000).toString();

    const token = await ctx.prisma.token.create({
      data: {
        payload,
        user: {
          connectOrCreate: {
            where: {
              email,
            },
            create: {
              name,
              email,
            },
          },
        },
      },
    });

    // TODO mail
  }),
  confirm: publicProcedure
    .input(confirmInput)
    .mutation(async ({ ctx, input }) => {
      const { token } = input;
      const foundToken = await ctx.prisma.token.findUnique({
        where: {
          payload: token,
        },
      });

      if (!foundToken) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The login link is not valid. Please try again.",
        });
      }

      ctx.session.user = {
        id: foundToken.userId,
      };

      await ctx.session.save();

      await ctx.prisma.token.deleteMany({
        where: {
          userId: foundToken.userId,
        },
      });
    }),
});
