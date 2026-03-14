import type { StateCreator } from "zustand";

type Category = object; // Temp

export type RecipesSliceType = {
  categories: Category[];
};

export const createRecipeSlice: StateCreator<RecipesSliceType> = () => ({
  categories: [],
});
