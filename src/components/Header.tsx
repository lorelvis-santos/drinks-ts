import { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();
  const isHome = useMemo(() => pathname === "/", [pathname]);

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
                  ? "bg-orange-500/80 text-white rounded-lg p-2 uppercase font-bold transition-colors"
                  : "hover:bg-orange-500/80 text-white uppercase rounded-lg font-bold p-2 transition-colors"
              }
              to="/"
            >
              Inicio
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-orange-500/80 text-white rounded-lg p-2 uppercase font-bold transition-colors"
                  : "hover:bg-orange-500/80 text-white uppercase rounded-lg font-bold p-2 transition-colors"
              }
              to="/favoritos"
            >
              Favoritos
            </NavLink>
          </nav>
        </div>

        {isHome && (
          <form className="md:w-1/2 2xl:w-1/3 bg-orange-400/80 my-32 p-10 rounded-lg shadow flex flex-col gap-6">
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
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="ingredient"
                className="text-white font-bold text-lg"
              >
                Categoría
              </label>
              <select
                name="ingredient"
                id="ingredient"
                className="p-3 bg-white w-full rounded-lg focus:outline-none"
              />
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
