// CONTEXT

import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { prisma } from "@/server/db";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/libs/server/sessions";

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

import { TRPCError } from "@trpc/server";

export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 */
export const publicProcedure = t.procedure;

const isAuthenticated = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  return next({
    ctx: {
      prisma: ctx.prisma,
      userId: ctx.session.user.id,
    },
  });
});

/**
 * Private (authenticated) procedure
 */
export const privateProcedure = t.procedure.use(isAuthenticated);
