import { z } from "zod";

export const CategoryResponseSchema = z
  .object({
    strCategory: z.string().trim(),
  })
  .transform((val) => ({
    name: val.strCategory,
  }));

export const CategoriesResponseSchema = z.array(CategoryResponseSchema);
