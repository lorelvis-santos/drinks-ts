import { create } from "zustand";
import { createRecipeSlice, type RecipesSliceType } from "./recipeSlice";
import { devtools } from "zustand/middleware";
import {
  createFavoritesSlice,
  type FavoritesSliceType,
} from "./favoritesSlice";

export const useAppStore = create<RecipesSliceType & FavoritesSliceType>()(
  devtools((...a) => ({
    ...createRecipeSlice(...a),
    ...createFavoritesSlice(...a),
  })),
);
