import { createMemoryRouter } from "react-router-dom";

import { Dashboard } from "@/features/dashboard";
import { Library } from "@/features/library";
import { Playground } from "@/features/playground";
import { Settings } from "@/features/settings";
import { MainLayout } from "@/layout/MainLayout";
import { TitleBarLayout } from "@/layout/TitleBarLayout";

export const appRouter: ReturnType<typeof createMemoryRouter> =
   createMemoryRouter([
      {
         element: <TitleBarLayout />,
         children: [
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
                  {
                     path: "/playground",
                     element: <Playground />,
                  },
               ],
            },
         ],
      },
   ]);
