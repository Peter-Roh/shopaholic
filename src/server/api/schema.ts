import { z } from "zod";

export const enterInput = z
  .object({
    email: z.string().email(),
  })
  .required();

export const confirmInput = z.object({
  token: z.string().min(6).max(6),
});

export const category2Input = z.object({
  category1Id: z.number(),
});

export const category3Input = z.object({
  category2Id: z.number(),
});
