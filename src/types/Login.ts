const loginMethods = ["email", "phone"] as const;
type LoginMethodKeys = (typeof loginMethods)[number];

export const LoginMethods = {
  email: "email",
  phone: "phone",
} as const satisfies Record<LoginMethodKeys, string>;
export type LoginMethod = (typeof LoginMethods)[keyof typeof LoginMethods];
