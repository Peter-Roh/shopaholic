import type { IronSessionOptions } from "iron-session";

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
