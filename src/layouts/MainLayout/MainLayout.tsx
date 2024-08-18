import { Outlet } from "react-router-dom";
import "@/layouts/index.css";
import { Header } from "@/components/Header/Header.tsx";

export const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="page">
        <Outlet />
      </main>
    </>
  );
};
