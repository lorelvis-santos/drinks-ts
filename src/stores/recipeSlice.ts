import type { StateCreator } from "zustand";
import { getCategories } from "../services/recipe.service";
import type { Category } from "../types";

export type RecipesSliceType = {
  categories: Category[];
  fetchCategories: () => Promise<void>;
};

export const createRecipeSlice: StateCreator<RecipesSliceType> = (set) => ({
  categories: [],
  fetchCategories: async () => {
    const categories = await getCategories();
    set(() => ({
      categories,
    }));
  },
});
