import { getIronSession, type IronSession } from "iron-session";
import type { GetServerSidePropsContext } from "next";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { sessionOptions } from "./sessions";
import { appRouter } from "@/server/api/root";
import { prisma } from "@/server/db";
import superjson from "superjson";

// Server - Side Helpers

export const createHelpers = async (context: GetServerSidePropsContext) => {
  const session: IronSession = await getIronSession(
    context.req,
    context.res,
    sessionOptions
  );

  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      prisma,
      session,
    },
    transformer: superjson,
  });

  return helpers;
};
