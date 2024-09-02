import { FC } from "react";
import { Outlet } from "react-router-dom";

import { TitleBar } from "@/features/titleBar";

export const TitleBarLayout: FC = () => {
   return (
      <div className="h-screen w-screen grid grid-rows-[var(--titlebar-height)_1fr]">
         <TitleBar />
         <Outlet />
      </div>
   );
};
