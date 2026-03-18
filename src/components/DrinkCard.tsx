import type { Drink } from "../types";
import { useAppStore } from "../stores/useAppStore";

type DrinkCardProps = {
  drink: Drink;
};

export default function DrinkCard({ drink }: DrinkCardProps) {
  const selectRecipe = useAppStore((state) => state.selectRecipe);

  return (
    <div className="border border-slate-200 shadow-lg rounded-md">
      <div className="overflow-hidden rounded-tl-md rounded-tr-md">
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
