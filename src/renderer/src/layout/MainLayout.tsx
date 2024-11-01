import { FC } from "react";
import { Outlet } from "react-router-dom";

import { NavBar } from "@/features/navbar";

export const MainLayout: FC = () => {
   return (
      <div className="flex grow min-h-0">
         <NavBar />
         <main className="bg-background rounded-tl-2xl min-h-0 overflow-x-auto width-0 grow">
            <Outlet />
         </main>
      </div>
   );
};
