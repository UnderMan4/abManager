import { FC } from "react";
import { Outlet } from "react-router-dom";

import { NavBar } from "@/features/navbar";

export const MainLayout: FC = () => {
   return (
      <div className="flex w-full gap-2">
         <NavBar />
         <Outlet />
      </div>
   );
};
