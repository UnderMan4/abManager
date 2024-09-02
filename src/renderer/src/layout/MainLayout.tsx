import { FC } from "react";
import { Outlet } from "react-router-dom";

import { NavBar } from "@/features/navbar";

export const MainLayout: FC = () => {
   return (
      <div className="flex w-full bg-radix-gray-300">
         <NavBar />
         <div className="bg-radix-gray-200 p-4 rounded-tl-2xl grow">
            <Outlet />
         </div>
      </div>
   );
};
