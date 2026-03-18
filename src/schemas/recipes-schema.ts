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

export const RecipeResponseSchema = z
  .object({
    idDrink: z.string(),
    strDrink: z.string(),
    strDrinkThumb: z.string(),
    strInstructions: z.string(),
    // Definimos los campos como opcionales/nullable según la API
    strIngredient1: z.string().nullable(),
    strIngredient2: z.string().nullable(),
    strIngredient3: z.string().nullable(),
    strIngredient4: z.string().nullable(),
    strIngredient5: z.string().nullable(),
    strIngredient6: z.string().nullable(),
    strMeasure1: z.string().nullable(),
    strMeasure2: z.string().nullable(),
    strMeasure3: z.string().nullable(),
    strMeasure4: z.string().nullable(),
    strMeasure5: z.string().nullable(),
    strMeasure6: z.string().nullable(),
  })
  .transform((val) => {
    // 1. Agrupamos ingredientes y medidas de forma dinámica
    const ingredients = [];

    for (let i = 1; i <= 6; i++) {
      const ingredient = val[`strIngredient${i}` as keyof typeof val];
      const measure = val[`strMeasure${i}` as keyof typeof val];

      // Solo agregamos si el ingrediente existe y no es una cadena vacía
      if (ingredient) {
        ingredients.push({
          name: ingredient,
          measure: measure ? measure.trim() : "Al gusto", // "Al gusto" si no hay medida
        });
      }
    }

    // 2. Retornamos el objeto limpio y estructurado
    return {
      id: val.idDrink,
      name: val.strDrink,
      thumbUrl: val.strDrinkThumb,
      instructions: val.strInstructions,
      ingredients,
    };
  });

export const RecipesResponseSchema = z
  .object({
    drinks: z.array(RecipeResponseSchema),
  })
  .transform((val) => val.drinks);
