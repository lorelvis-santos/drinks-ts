import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type SubmitEvent,
} from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";
import Error from "./Error";

export default function Header() {
  const { pathname } = useLocation();
  const isHome = useMemo(() => pathname === "/", [pathname]);

  const [searchFilters, setSearchFilters] = useState({
    ingredient: "",
    category: "",
  });

  const [error, setError] = useState("");

  const fetchCategories = useAppStore((state) => state.fetchCategories);
  const categories = useAppStore((state) => state.categories);

  useEffect(() => {
    fetchCategories();
  });

  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement, HTMLInputElement>
      | ChangeEvent<HTMLSelectElement, HTMLSelectElement>,
  ) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(searchFilters).includes("")) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setError("");
  };

  return (
    <header
      className={
        isHome
          ? "bg-[url(/bg.jpg)] bg-center bg-cover h-screen"
          : "bg-slate-800"
      }
    >
      <div className="mx-auto container px-5 py-8">
        <div className="flex justify-between items-center">
          <div>
            <img src="/logo.svg" alt="Logo de la aplicación" className="w-24" />
          </div>
          <nav className="flex gap-4">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-orange-500/85 text-white rounded-lg p-2 uppercase font-bold transition-colors"
                  : "hover:bg-orange-500/85 text-white uppercase rounded-lg font-bold p-2 transition-colors"
              }
              to="/"
            >
              Inicio
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-orange-500/85 text-white rounded-lg p-2 uppercase font-bold transition-colors"
                  : "hover:bg-orange-500/85 text-white uppercase rounded-lg font-bold p-2 transition-colors"
              }
              to="/favoritos"
            >
              Favoritos
            </NavLink>
          </nav>
        </div>

        {isHome && (
          <form
            className="md:w-1/2 2xl:w-1/3 bg-orange-400/85 my-32 p-10 rounded-lg shadow flex flex-col gap-6"
            onSubmit={handleSubmit}
          >
            {error && <Error>{error}</Error>}

            <div className="flex flex-col gap-2">
              <label
                htmlFor="ingredient"
                className="text-white font-bold text-lg"
              >
                Nombre o ingredientes
              </label>
              <input
                type="text"
                name="ingredient"
                id="ingredient"
                className="p-3 bg-white w-full rounded-lg focus:outline-none"
                placeholder="Ej. Vodka, Tequila, Café..."
                onChange={handleChange}
                value={searchFilters.ingredient}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="category"
                className="text-white font-bold text-lg"
              >
                Categoría
              </label>
              <select
                name="category"
                id="category"
                className="p-3 bg-white w-full rounded-lg focus:outline-none"
                defaultValue=""
                onChange={handleChange}
                value={searchFilters.category}
              >
                <option value="" disabled>
                  -- Seleccione una opción --
                </option>
                {categories.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="submit"
              value="Buscar recetas"
              className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-black mt-3 uppercase rounded-lg p-2"
            />
          </form>
        )}
      </div>
    </header>
  );
}
