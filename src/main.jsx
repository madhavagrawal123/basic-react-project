import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import MovieSearch from "./MovieSearch";
import FavoritesPage from "./FavoritesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MovieSearch />,
  },
  {
    path: "/favorites",
    element: <FavoritesPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);