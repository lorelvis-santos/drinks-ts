import type { Drink } from "../types";
import { useAppStore } from "../stores/useAppStore";
import { BookmarkIcon, BookmarkSlashIcon } from "@heroicons/react/20/solid";

type DrinkCardProps = {
  drink: Drink;
};

export default function DrinkCard({ drink }: DrinkCardProps) {
  const selectRecipe = useAppStore((state) => state.selectRecipe);
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);
  const favoriteExists = useAppStore((state) => state.favoriteExists);

  // Para renderizado del card
  useAppStore((state) => state.favorites);

  return (
    <div className="border border-slate-200 shadow-lg rounded-md relative">
      <div
        className="absolute top-1 right-1 rounded-full bg-red-400 p-2 cursor-pointer hover:bg-red-500 transition-all hover:visible z-30"
        onClick={() => toggleFavorite(drink.id)}
      >
        {favoriteExists(drink.id) ? (
          <BookmarkSlashIcon className="w-6 h-6 text-white" />
        ) : (
          <BookmarkIcon className="w-6 h-6 text-white" />
        )}
      </div>
      <div
        className="overflow-hidden rounded-tl-md rounded-tr-md cursor-pointer"
        onClick={() => selectRecipe(drink.id)}
      >
        <img
          src={drink.thumbUrl}
          alt={drink.thumbUrl}
          className="hover:scale-115 transition hover:rotate-2"
        />
      </div>
      <div className="p-5">
        <h2 className="text-xl truncate font-bold">{drink.name}</h2>
        <button
          type="button"
          className="bg-orange-400 hover:bg-orange-500 transition-colors mt-5 p-3 rounded-lg font-bold text-white uppercase cursor-pointer w-full"
          onClick={() => selectRecipe(drink.id)}
        >
          Ver Receta
        </button>
      </div>
    </div>
  );
}
