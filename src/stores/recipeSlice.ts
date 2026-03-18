import type { StateCreator } from "zustand";
import {
  getCategories,
  getRecipeById,
  getRecipes,
} from "../services/recipe.service";
import type { Category, Drink, SearchFilter } from "../types";

export type RecipesSliceType = {
  currentRecipeId: Drink["id"] | null;
  categories: Category[];
  drinks: Drink[];
  fetchCategories: () => Promise<void>;
  searchRecipes: (filters: SearchFilter) => Promise<void>;
  selectRecipe: (id: Drink["id"]) => Promise<void>;
};

export const createRecipeSlice: StateCreator<RecipesSliceType> = (set) => ({
  currentRecipeId: null,
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
  selectRecipe: async (id) => {
    const recipe = await getRecipeById(id);
    // todo
    set(() => ({
      currentRecipeId: id,
    }));
  },
});
