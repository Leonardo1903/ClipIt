import { Header, Footer } from "@/components";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <>
      <main className="min-h-screen container">
        <Header />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
