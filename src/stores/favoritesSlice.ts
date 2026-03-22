import type { StateCreator } from "zustand";
import type { Recipe } from "../types";

export type FavoritesSliceType = {
  favorites: Recipe[];
  handleClickFavorite: (recipe: Recipe) => void;
  favoriteExists: (id: Recipe["id"]) => boolean;
};

export const createFavoritesSlice: StateCreator<FavoritesSliceType> = (
  set,
  get,
) => ({
  favorites: [],
  handleClickFavorite: (recipe) => {
    if (get().favoriteExists(recipe.id)) {
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
  favoriteExists: (id) => {
    return get().favorites.some((favorite) => favorite.id === id);
  },
});
