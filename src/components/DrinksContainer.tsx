import type { Drink } from "../types";
import DrinkCard from "./DrinkCard";

type DrinksContainerProps = {
  drinks: Drink[];
};

export default function DrinksContainer({ drinks }: DrinksContainerProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
      {drinks.map((drink) => (
        <DrinkCard key={drink.id} drink={drink} />
      ))}
    </div>
  );
}
