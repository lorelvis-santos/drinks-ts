import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipeSlice, type RecipesSliceType } from "./recipeSlice";
import {
  createNotificationSlice,
  type NotificationSliceType,
} from "./notificationSlice";
import {
  createFavoritesSlice,
  type FavoritesSliceType,
} from "./favoritesSlice";

export const useAppStore = create<
  RecipesSliceType & FavoritesSliceType & NotificationSliceType
>()(
  devtools((...a) => ({
    ...createRecipeSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a),
  })),
);
