import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import "./App.css";
import { Auth, Dashboard, Landing, Link, RedirectLink } from "./pages";
import SessionProvider from "./context/SesssionContext";
import { ProtectedRoutes } from "./components";

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
    </SessionProvider>
  );
}

export default App;
