import axios from "axios";
import { CategoriesResponseSchema } from "../schemas/CategoryResponseSchema";
import type { Category } from "../types";

export async function getCategories(): Promise<Category[]> {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
  const {
    data: { drinks },
  } = await axios(url);

  const result = CategoriesResponseSchema.safeParse(drinks);

  if (result.success) {
    return result.data;
  }

  return [];
}
