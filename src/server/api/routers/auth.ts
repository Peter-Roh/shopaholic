import type { GoogleApiResponse } from "@/types/auth";
import { authGoogleInput } from "../schema";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  google: publicProcedure
    .input(authGoogleInput)
    .mutation(async ({ ctx, input }) => {
      const response = (await (
        await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${input.accessToken}`,
          {
            method: "GET",
          }
        )
      ).json()) as GoogleApiResponse;

      const name = response.email.split("@")[0] || "Anonymous"; // email 주소 앞부분을 이름으로

      const user = await ctx.prisma.user.findUnique({
        where: {
          email: response.email,
        },
      });

      if (!user) {
        const newUser = await ctx.prisma.user.create({
          data: {
            name,
            email: response.email,
          },
        });

        ctx.session.user = {
          id: newUser.id,
        };
      } else {
        ctx.session.user = {
          id: user.id,
        };
      }

      await ctx.session.save();
    }),
});
