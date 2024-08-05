import { createMemoryRouter } from "react-router-dom";

import { Dashboard } from "@/features/dashboard";
import {
   ImportNewFile,
   ImportNewFolder,
   ImportNewMethod,
} from "@/features/importNew";
import { Library } from "@/features/library";
import { Playground } from "@/features/playground";
import { Settings } from "@/features/settings";
import { FullscreenLayout } from "@/layout/FullscreenLayout";
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
            {
               path: "/playground",
               element: <Playground />,
            },
         ],
      },
      {
         element: <FullscreenLayout />,
         children: [
            {
               path: "/import-new/method",
               element: <ImportNewMethod />,
            },
            {
               path: "/import-new/folder",
               element: <ImportNewFolder />,
            },
            {
               path: "/import-new/file",
               element: <ImportNewFile />,
            },
         ],
      },
   ]);
