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
  modal: boolean;
  fetchCategories: () => Promise<void>;
  getRecipe: (id: Recipe["id"]) => Promise<Recipe | null>;
  searchRecipes: (filters: SearchFilter) => Promise<void>;
  selectRecipe: (id: Drink["id"]) => Promise<void>;
  closeModal: () => void;
};

export const createRecipeSlice: StateCreator<RecipesSliceType> = (set) => ({
  categories: [],
  drinks: [],
  selectedRecipe: null,
  modal: false,
  fetchCategories: async () => {
    const categories = await getCategories();
    set(() => ({
      categories,
    }));
  },
  getRecipe: async (id) => {
    return await getRecipeById(id);
  },
  searchRecipes: async (filters) => {
    const drinks = await getRecipes(filters);
    set(() => ({
      drinks,
    }));
  },
  selectRecipe: async (id) => {
    const selectedRecipe = await getRecipeById(id);
    set(() => ({
      selectedRecipe,
      modal: true,
    }));
  },
  showModal: () => {
    set({
      modal: true,
    });
  },
  closeModal: () => {
    set(() => ({
      modal: false,
      selectedRecipe: null,
    }));
  },
});
