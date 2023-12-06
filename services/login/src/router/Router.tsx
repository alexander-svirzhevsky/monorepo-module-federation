import { createBrowserRouter } from "react-router-dom";

import App from "@/App";
import { Suspense, lazy } from "react";
import Login from "@/pages/Login";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: (
          <Suspense fallback='Loading...'>
            <Login />
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default routes;
