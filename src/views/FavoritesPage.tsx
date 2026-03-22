import { useMemo } from "react";
import { useAppStore } from "../stores/useAppStore";
import DrinksContainer from "../components/DrinksContainer";

export default function FavoritesPage() {
  const favorites = useAppStore((state) => state.favorites);
  const hasFavorites = useMemo(() => favorites.length > 0, [favorites]);

  return (
    <>
      <h1 className="text-4xl font-extrabold">Favoritos</h1>
      {hasFavorites ? (
        <DrinksContainer drinks={favorites} />
      ) : (
        <>
          <p className="my-10 text-2xl">
            No hay recetas marcadas como favoritas
          </p>
        </>
      )}
    </>
  );
}
