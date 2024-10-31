import { FC } from "react";
import { Outlet } from "react-router-dom";

import { TitleBar } from "@/features/titleBar";

export const TitleBarLayout: FC = () => {
   return (
      <div className="h-screen min-h-0 flex flex-col">
         <TitleBar />
         <Outlet />
      </div>
   );
};
