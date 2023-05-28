import type {
  GithubAccessTokenResponse,
  GithubData,
  GoogleApiResponse,
} from "@/types/auth";
import { authGithubInput, authGoogleInput } from "../schema";
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
  github: publicProcedure
    .input(authGithubInput)
    .mutation(async ({ ctx, input }) => {
      const response = (await (
        await fetch(
          `https://github.com/login/oauth/access_token?client_id=${process.env
            .GITHUB_ID!}&client_secret=${process.env.GITHUB_SECRET!}&code=${
            input.code
          }`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
            },
          }
        )
      ).json()) as GithubAccessTokenResponse;

      const data = (await (
        await fetch(`https://api.github.com/user`, {
          method: "GET",
          headers: {
            authorization: `token ${response.access_token}`,
          },
        })
      ).json()) as GithubData;

      const user = await ctx.prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (!user) {
        const newUser = await ctx.prisma.user.create({
          data: {
            name: data.name,
            email: data.email,
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
