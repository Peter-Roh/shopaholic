import { z } from "zod";

export const enterInput = z
  .object({
    email: z.string().email(),
  })
  .required();

export const confirmInput = z.object({
  token: z.string().min(6).max(6),
});

export const subcategoryInput = z.object({
  categoryId: z.number(),
});
