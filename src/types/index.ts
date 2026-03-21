import { z } from "zod";
import type {
  CategoryResponseSchema,
  DrinkResponseSchema,
  RecipeResponseSchema,
  SearchFilterSchema,
} from "../schemas/recipes-schema";

export type Category = z.infer<typeof CategoryResponseSchema>;
export type Drink = z.infer<typeof DrinkResponseSchema>;
export type SearchFilter = z.infer<typeof SearchFilterSchema>;
export type Recipe = z.infer<typeof RecipeResponseSchema>;
