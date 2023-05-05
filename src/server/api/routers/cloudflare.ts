import { createTRPCRouter, privateProcedure } from "../trpc";
import { cloudflareFileOutput } from "../schema";
import { ratelimit } from "@/server/ratelimiter";
import { TRPCError } from "@trpc/server";

export const cloudflareRouter = createTRPCRouter({
  file: privateProcedure
    .output(cloudflareFileOutput)
    .mutation(async ({ ctx }) => {
      const { success } = await ratelimit.limit(ctx.userId.toString());

      if (!success) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "Too many requests have been made.",
        });
      }

      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env
          .CLOUDFLARE_ACCOUND_ID!}/images/v2/direct_upload`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN!}`,
          },
        }
      );

      return response.json();
    }),
});
