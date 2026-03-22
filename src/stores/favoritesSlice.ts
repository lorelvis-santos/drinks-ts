import type { StateCreator } from "zustand";
import type { Recipe } from "../types";

export type FavoritesSliceType = {
  favorites: Recipe[];
  handleClickFavorite: (recipe: Recipe) => void;
};

export const createFavoritesSlice: StateCreator<FavoritesSliceType> = (
  set,
  get,
) => ({
  favorites: [],
  handleClickFavorite: (recipe) => {
    if (get().favorites.some((favorite) => favorite.id === recipe.id)) {
      set((state) => ({
        favorites: state.favorites.filter(
          (favorite) => favorite.id !== recipe.id,
        ),
      }));
      return;
    }

    set((state) => ({
      favorites: [...state.favorites, recipe],
    }));
  },
});
