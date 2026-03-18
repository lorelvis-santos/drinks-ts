import type { Drink } from "../types";

type DrinkCardProps = {
  drink: Drink;
};

export default function DrinkCard({ drink }: DrinkCardProps) {
  return (
    <div className="border border-slate-200 shadow-lg">
      <div className="overflow-hidden">
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
          className="bg-orange-400 hover:bg-orange-500 transition-colors mt-5 p-3 rounded-lg font-bold text-white uppercase cursor-pointer"
        >
          Ver Receta
        </button>
      </div>
    </div>
  );
}
