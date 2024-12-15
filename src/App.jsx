import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import { Auth, Dashboard, Landing, Link, RedirectLink } from "./pages";
import SessionProvider from "./context/SesssionContext";
import { ProtectedRoutes } from "./components";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/link/:id",
        element: (
          <ProtectedRoutes>
            <Link />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/:id",
        element: <RedirectLink />,
      },
    ],
  },
]);

function App() {
  return (
    <SessionProvider>
      <RouterProvider router={router} />
      <Toaster />
    </SessionProvider>
  );
}

export default App;
