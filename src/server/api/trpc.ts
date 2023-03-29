// CONTEXT

import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { prisma } from "@/server/db";
import { getIronSession } from "iron-session";
import { sessionOptions } from "libs/sessions";

// TODO authenticate request

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const session = await getIronSession(opts.req, opts.res, sessionOptions);

  return {
    prisma,
    session,
  };
};

// INITIALIZATION

import { initTRPC } from "@trpc/server";
import superjson from "superjson";

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

// ROUTER & PROCEDURE

export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 */
export const publicProcedure = t.procedure;

// TODO authenticated procedure

// const isAuthenticated = t.middleware(async ({ ctx, next }) => {
//   return next({
//     ctx: {},
//   });
// });

/**
 * Private (authenticated) procedure
 */
// export const privateProcedure = t.procedure.use(isAuthenticated);
