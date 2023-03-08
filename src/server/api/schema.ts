import { z } from "zod";

export const helloInput = z
  .object({
    text: z.string(),
  })
  .optional();
