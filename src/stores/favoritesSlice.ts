import type { StateCreator } from "zustand";
import type { Recipe } from "../types";
import { type NotificationSliceType } from "./notificationSlice";
import type { RecipesSliceType } from "./recipeSlice";

export type FavoritesSliceType = {
  favorites: Recipe[];
  handleClickFavorite: (recipe: Recipe) => void;
  favoriteExists: (id: Recipe["id"]) => boolean;
  loadFromStorage: () => void;
  toggleFavorite: (id: Recipe["id"]) => Promise<void>;
};

export const createFavoritesSlice: StateCreator<
  FavoritesSliceType & NotificationSliceType & RecipesSliceType,
  [],
  [],
  FavoritesSliceType
> = (set, get) => ({
  favorites: [],

  handleClickFavorite: (recipe) => {
    let updatedFavorites = [];

    if (get().favoriteExists(recipe.id)) {
      // Eliminar
      updatedFavorites = get().favorites.filter((fav) => fav.id !== recipe.id);

      get().showNotification({
        text: "Receta eliminada de favoritos",
        error: false,
      });
    } else {
      // Agregar
      updatedFavorites = [...get().favorites, recipe];

      get().showNotification({
        text: "Receta agregada a favoritos",
        error: false,
      });
    }

    // Actualizar estado y persistencia SIEMPRE
    set({ favorites: updatedFavorites });
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
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

  toggleFavorite: async (id) => {
    // 1. Si ya existe, lo eliminamos directamente (no necesitamos la receta completa)
    if (get().favoriteExists(id)) {
      const updatedFavorites = get().favorites.filter((fav) => fav.id !== id);
      set({ favorites: updatedFavorites });
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      get().showNotification({ text: "Eliminado de favoritos", error: false });
      return;
    }

    // 2. Si no existe, buscamos la receta (usando la función del RecipesSlice)
    const recipe = await get().getRecipe(id); // get() tiene acceso a RecipesSlice
    if (recipe) {
      get().handleClickFavorite(recipe);
    }
  },
});
