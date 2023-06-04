import type { IronSessionOptions } from "iron-session";
import { withIronSessionSsr } from "iron-session/next";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

export const sessionOptions: IronSessionOptions = {
  cookieName: "shopaholic",
  password: process.env.SESSION_PASSWORD!,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export const withSessionSsr = (
  handler: (
    context: GetServerSidePropsContext
  ) =>
    | GetServerSidePropsResult<{ [key: string]: unknown }>
    | Promise<GetServerSidePropsResult<{ [key: string]: unknown }>>
) => {
  return withIronSessionSsr(handler, sessionOptions);
};
