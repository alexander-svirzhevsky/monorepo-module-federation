import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
// @ts-ignore
import loginRoutes from "login/Router";
// @ts-ignore
import aboutRoutes from "about/Router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [...loginRoutes, ...aboutRoutes],
  },
]);
