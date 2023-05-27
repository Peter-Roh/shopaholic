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

export const getManyInput = z.object({
  categoryId: z.number().int().optional(),
  subcategoryId: z.number().int().optional(),
});

export const getItemByIdInput = z.object({
  itemId: z.number().int().nonnegative(),
});

export const getUserByIdInput = z.object({
  userId: z.number().int().nonnegative(),
});

export const toggleLikeInput = z.object({
  userId: z.number().int().nonnegative(),
  itemId: z.number().int().nonnegative(),
});

export const cartAddInput = z.object({
  userId: z.number().int().nonnegative(),
  itemId: z.number().int().nonnegative(),
  qty: z.number().int().nonnegative(),
});

export const cartDeleteInput = z.object({
  cartItemId: z.number().int().nonnegative(),
});

export const commentAddInput = z.object({
  userId: z.number().int().nonnegative(),
  itemId: z.number().int().nonnegative(),
  comment: z.string(),
});

export const commentDeleteInput = z.object({
  userId: z.number().int().nonnegative(),
  commentId: z.number().int().nonnegative(),
});

export const commentGetByItemInput = z.object({
  itemId: z.number().int().nonnegative(),
});

export const toggleCommentLikeInput = z.object({
  userId: z.number().int().nonnegative(),
  commentId: z.number().int().nonnegative(),
});

export const authGoogleInput = z.object({
  accessToken: z.string(),
});
