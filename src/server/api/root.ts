import { createTRPCRouter } from "@/server/api/trpc";
import { usersRouter } from "./routers/users";
import { categoriesRouter } from "./routers/categories";

export const appRouter = createTRPCRouter({
  users: usersRouter,
  categories: categoriesRouter,
});

export type AppRouter = typeof appRouter;
