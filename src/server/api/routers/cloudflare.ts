import { createTRPCRouter, privateProcedure } from "../trpc";
import { cloudflareFileOutput } from "../schema";

export const cloudflareRouter = createTRPCRouter({
  file: privateProcedure.output(cloudflareFileOutput).mutation(async () => {
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
