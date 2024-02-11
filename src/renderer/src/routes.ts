import { createMemoryRouter } from "react-router-dom";

import { FirstSetupPage, LibraryPage } from "@/pages";

export const appRouter: ReturnType<typeof createMemoryRouter> =
   createMemoryRouter([
      {
         path: "/",
         Component: LibraryPage,
      },
      {
         path: "/first-setup",
         Component: FirstSetupPage,
      },
   ]);
