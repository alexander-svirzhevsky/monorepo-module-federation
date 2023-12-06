import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { router } from "@/router/Router";

const domNode = document.getElementById("root");
const root = createRoot(domNode);

root.render(<RouterProvider router={router} />);
