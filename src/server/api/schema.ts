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

export const itemsInput = z.object({
  name: z.string(),
  image: z.string(),
  price: z.number().int().nonnegative(),
  description: z.string(),
  userId: z.number().int().nonnegative(),
  categoryId: z.number().int().nonnegative(),
  subcategoryId: z.number().int().nonnegative(),
});

export const editInput = z.object({
  id: z.number().int().nonnegative(),
  name: z.string().optional(),
  avatar: z.string().optional(),
});

export const deleteInput = z.object({
  id: z.number().int().nonnegative(),
});

export const cloudflareFileOutput = z.object({
  errors: z.string().array(),
  messages: z.string().array(),
  success: z.boolean(),
  result: z.object({
    id: z.string(),
    uploadURL: z.string(),
  }),
});
