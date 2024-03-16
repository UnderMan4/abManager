import { FC, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { NavBar } from "@/features/library/components/NavBar";

export const MainLayout: FC = () => {
   const location = useLocation();

   useEffect(() => {
      console.log(location);
   }, [location]);
   return (
      <div className="flex h-screen w-full">
         <NavBar />
         <Outlet />
      </div>
   );
};
