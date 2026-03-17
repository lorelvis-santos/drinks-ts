import { z } from "zod";

export const CategoryResponseSchema = z
  .object({
    strCategory: z.string().trim(),
  })
  .transform((val) => ({
    name: val.strCategory,
  }));

export const CategoriesResponseSchema = z
  .object({
    drinks: z.array(CategoryResponseSchema),
  })
  .transform((val) => val.drinks);

export const SearchFilterSchema = z.object({
  ingredient: z.string(),
  category: z.string(),
});

export const DrinkResponseSchema = z
  .object({
    idDrink: z.string(),
    strDrink: z.string(),
    strDrinkThumb: z.url(),
  })
  .transform((val) => ({
    id: val.idDrink,
    name: val.strDrink,
    thumbUrl: val.strDrinkThumb,
  }));

export const DrinksResponseSchema = z
  .object({
    drinks: z.array(DrinkResponseSchema),
  })
  .transform((val) => val.drinks);
