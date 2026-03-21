import type { StateCreator } from "zustand";
import {
  getCategories,
  getRecipeById,
  getRecipes,
} from "../services/recipe.service";
import type { Category, Drink, SearchFilter, Recipe } from "../types";

export type RecipesSliceType = {
  selectedRecipe: Recipe | null;
  categories: Category[];
  drinks: Drink[];
  fetchCategories: () => Promise<void>;
  searchRecipes: (filters: SearchFilter) => Promise<void>;
  selectRecipe: (id: Drink["id"]) => Promise<void>;
};

export const createRecipeSlice: StateCreator<RecipesSliceType> = (set) => ({
  categories: [],
  drinks: [],
  selectedRecipe: null,
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

    set(() => ({
      selectedRecipe: recipe,
    }));
  },
});
