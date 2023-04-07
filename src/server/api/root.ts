import { createTRPCRouter } from "@/server/api/trpc";
import { usersRouter } from "./routers/users";
import { categoriesRouter } from "./routers/categories";
import { itemsRouter } from "./routers/items";

export const appRouter = createTRPCRouter({
  users: usersRouter,
  categories: categoriesRouter,
  items: itemsRouter,
});

export type AppRouter = typeof appRouter;
