import { FC } from "react";
import { Outlet } from "react-router-dom";

import { NavBar } from "@/features/navbar";

export const MainLayout: FC = () => {
   return (
      <div className="flex h-screen w-full py-2 gap-2">
         <NavBar />
         <Outlet />
      </div>
   );
};
