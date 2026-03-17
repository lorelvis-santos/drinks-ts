import axios from "axios";
import {
  CategoriesResponseSchema,
  DrinksResponseSchema,
} from "../schemas/recipes-schema";
import type { Category, Drink, SearchFilter } from "../types";

export async function getCategories(): Promise<Category[]> {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
  const { data } = await axios(url);

  const result = CategoriesResponseSchema.safeParse(data);

  if (result.success) {
    return result.data;
  }

  return [];
}

export async function getRecipes(filter: SearchFilter): Promise<Drink[]> {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter.category}&i=${filter.ingredient}`;

  const { data } = await axios(url);

  const result = DrinksResponseSchema.safeParse(data);

  if (result.success) {
    return result.data;
  }

  return [];
}
