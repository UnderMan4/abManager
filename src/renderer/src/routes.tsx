import { createMemoryRouter } from "react-router-dom";

import { Dashboard } from "@/features/dashboard";
import { Library } from "@/features/library/Library";
import { Settings } from "@/features/settings";
import { MainLayout } from "@/layout/MainLayout";

export const appRouter: ReturnType<typeof createMemoryRouter> =
   createMemoryRouter([
      {
         element: <MainLayout />,
         children: [
            {
               path: "/",
               element: <Dashboard />,
            },
            {
               path: "/library",
               element: <Library />,
            },
            {
               path: "/settings",
               element: <Settings />,
            },
         ],
      },
   ]);
