import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import Layout from "./pages/layout";
import { Start } from "./pages/start/Start";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/start",
        element: <Start />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
