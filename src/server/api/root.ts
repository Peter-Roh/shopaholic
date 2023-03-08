import { createTRPCRouter } from "@/server/api/trpc";
import { exampleRouter } from "@/server/api/routers/example";
import { usersRouter } from "./routers/users";

export const appRouter = createTRPCRouter({
  example: exampleRouter,
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
