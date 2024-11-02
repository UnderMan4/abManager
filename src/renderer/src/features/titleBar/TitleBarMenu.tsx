import { FC } from "react";

import { Menubar } from "@/components/ui";

import { TitleBarFileMenuBar } from "./TitleBarFileMenuBar";

export const TitleBarMenu: FC = () => {
   return (
      <Menubar>
         <TitleBarFileMenuBar />
      </Menubar>
   );
};
