import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { useAppStore } from "../stores/useAppStore";

export default function Modal() {
  const recipe = useAppStore((state) => state.selectedRecipe);
  const modal = useAppStore((state) => state.modal);
  const closeModal = useAppStore((state) => state.closeModal);
  const handleClickFavorite = useAppStore((state) => state.handleClickFavorite);
  const favoriteExists = useAppStore((state) => state.favoriteExists);

  // Para forzar el re-renderizado una vez cambie la lista de favoritos.
  useAppStore((state) => state.favorites);

  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/70" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                  <DialogTitle
                    as="h3"
                    className="text-gray-900 text-2xl font-extrabold my-5 text-center"
                  >
                    {recipe?.name}
                  </DialogTitle>

                  <img
                    src={recipe?.thumbUrl}
                    alt={`${recipe?.name} image`}
                    className="w-full object-cover"
                  />

                  <DialogTitle
                    as="h3"
                    className="text-gray-900 text-2xl font-extrabold my-5"
                  >
                    Ingredientes y Cantidades
                  </DialogTitle>

                  <ul>
                    {recipe?.ingredients.map((ingredient) => (
                      <li key={ingredient.name}>
                        {ingredient.name} - {ingredient.measure}
                      </li>
                    ))}
                  </ul>

                  <DialogTitle
                    as="h3"
                    className="text-gray-900 text-2xl font-extrabold my-5"
                  >
                    Instrucciones
                  </DialogTitle>

                  <p className="text-lg">{recipe?.instructions}</p>

                  <div className="mt-10 flex justify-between gap-4">
                    <button
                      type="button"
                      className="w-full cursor-pointer rounded-lg bg-gray-600 p-3 font-bold uppercase text-white shadow hover:bg-gray-500 transition-colors"
                      onClick={closeModal}
                    >
                      Cerrar
                    </button>

                    <button
                      type="button"
                      className="w-full cursor-pointer rounded-lg bg-orange-600 p-3 font-bold uppercase text-white shadow hover:bg-orange-500 transition-colors"
                      onClick={() => {
                        if (recipe) {
                          handleClickFavorite(recipe);
                        }
                        closeModal();
                      }}
                    >
                      {recipe && favoriteExists(recipe.id)
                        ? "Remover de favoritos"
                        : "Agregar a favoritos"}
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
