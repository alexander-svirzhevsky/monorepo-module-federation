import { createBrowserRouter } from "react-router-dom";

import App from "@/App";
import { Suspense, lazy } from "react";

const About = lazy(() => import("@/pages/About"));

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/about",
        element: (
          <Suspense fallback='Loading...'>
            <About />
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default routes;
