import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { useAppStore } from "../stores/useAppStore";
import Notification from "../components/Notification";

export default function Layout() {
  const loadFavorites = useAppStore((state) => state.loadFromStorage);

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <>
      <Header />
      <main className="container mx-auto py-16 w-[90%]">
        <Outlet />
      </main>
      <Modal />
      <Notification />
    </>
  );
}
