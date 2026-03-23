import type { StateCreator } from "zustand";
import type { Recipe } from "../types";
import {
  createNotificationSlice,
  type NotificationSliceType,
} from "./notificationSlice";

export type FavoritesSliceType = {
  favorites: Recipe[];
  handleClickFavorite: (recipe: Recipe) => void;
  favoriteExists: (id: Recipe["id"]) => boolean;
  loadFromStorage: () => void;
};

export const createFavoritesSlice: StateCreator<
  FavoritesSliceType & NotificationSliceType,
  [],
  [],
  FavoritesSliceType
> = (set, get, api) => ({
  favorites: [],
  handleClickFavorite: (recipe) => {
    if (get().favoriteExists(recipe.id)) {
      set((state) => ({
        favorites: state.favorites.filter(
          (favorite) => favorite.id !== recipe.id,
        ),
      }));
      createNotificationSlice(set, get, api).showNotification({
        text: "Receta eliminada de favoritos",
        error: false,
      });
      return;
    }

    set((state) => ({
      favorites: [...state.favorites, recipe],
    }));

    createNotificationSlice(set, get, api).showNotification({
      text: "Receta agregada a favoritos",
      error: false,
    });

    localStorage.setItem("favorites", JSON.stringify(get().favorites));
  },
  favoriteExists: (id) => {
    return get().favorites.some((favorite) => favorite.id === id);
  },
  loadFromStorage: () => {
    const storedFavorites = localStorage.getItem("favorites");
    if (!storedFavorites) {
      return;
    }
    set(() => ({
      favorites: JSON.parse(storedFavorites),
    }));
  },
});
