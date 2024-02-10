import { createBrowserRouter } from "react-router-dom";

import { FirstSetupPage, LibraryPage } from "@/pages";

export const appRouter = createBrowserRouter([
   {
      path: "/",
      Component: LibraryPage,
   },
   {
      path: "/first-setup",
      Component: FirstSetupPage,
   },
]);
