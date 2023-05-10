import { createTRPCRouter } from "@/server/api/trpc";
import { usersRouter } from "./routers/users";
import { categoriesRouter } from "./routers/categories";
import { itemsRouter } from "./routers/items";
import { cloudflareRouter } from "./routers/cloudflare";
import { favoriteRouter } from "./routers/favorite";
import { cartRouter } from "./routers/cart";
import { commentRouter } from "./routers/comments";

export const appRouter = createTRPCRouter({
  users: usersRouter,
  categories: categoriesRouter,
  items: itemsRouter,
  cloudflare: cloudflareRouter,
  favorite: favoriteRouter,
  cart: cartRouter,
  comment: commentRouter,
});

export type AppRouter = typeof appRouter;
