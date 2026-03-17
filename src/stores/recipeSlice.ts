import type { StateCreator } from "zustand";
import { getCategories, getRecipes } from "../services/recipe.service";
import type { Category, Drink, SearchFilter } from "../types";

export type RecipesSliceType = {
  categories: Category[];
  drinks: Drink[];
  fetchCategories: () => Promise<void>;
  searchRecipes: (filters: SearchFilter) => Promise<void>;
};

export const createRecipeSlice: StateCreator<RecipesSliceType> = (set) => ({
  categories: [],
  drinks: [],
  fetchCategories: async () => {
    const categories = await getCategories();
    set(() => ({
      categories,
    }));
  },
  searchRecipes: async (filters) => {
    const drinks = await getRecipes(filters);
    set(() => ({
      drinks,
    }));
  },
});
