import { useMemo } from "react";
import { useAppStore } from "../stores/useAppStore";
import DrinksContainer from "../components/DrinksContainer";

export default function IndexPage() {
  const drinks = useAppStore((state) => state.drinks);
  const hasDrinks = useMemo(() => drinks.length > 0, [drinks]);

  return (
    <>
      <h1 className="text-4xl font-extrabold">Recetas</h1>
      {hasDrinks ? (
        <DrinksContainer drinks={drinks} />
      ) : (
        <>
          <p className="my-10 text-2xl">
            No hay resultados, prueba a utilizar el formulario de búsqueda
          </p>
        </>
      )}
    </>
  );
}
