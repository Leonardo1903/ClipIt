import { Header, Footer } from "@/components";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <>
      <main className="min-h-screen container">
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
          <Outlet />
        </div>
      <Footer />
      </main>
    </>
  );
}
