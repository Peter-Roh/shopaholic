import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { helloInput } from "./../schema";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure.input(helloInput).query(({ input }) => {
    return {
      greeting: `Hello ${input?.text ?? "world!"}`,
    };
  }),
});
