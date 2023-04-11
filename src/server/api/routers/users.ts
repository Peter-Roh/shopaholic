import { TRPCError } from "@trpc/server";
import { confirmInput, deleteInput, editInput, enterInput } from "./../schema";
import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "@/server/api/trpc";

export const usersRouter = createTRPCRouter({
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

    await ctx.prisma.token.create({
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

    return payload;
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
  edit: privateProcedure.input(editInput).mutation(async ({ ctx, input }) => {
    const { id, name, avatar } = input;

    const user = await ctx.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "The user is not found.",
      });
    }

    await ctx.prisma.user.update({
      where: {
        id,
      },
      data: {
        name: name ?? user.name,
        avatar: avatar ?? user.avatar,
      },
    });
  }),
  delete: privateProcedure
    .input(deleteInput)
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      await ctx.prisma.user.delete({
        where: {
          id,
        },
      });

      ctx.session.destroy();
    }),
});
