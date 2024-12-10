import { Header } from "@/components";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <>
      <main className="min-h-screen container">
        <Header />
        <Outlet />
      </main>
      <div className="p-10 text-center bg-gray-800 mt-10">Made with ❤️</div>
    </>
  );
}
