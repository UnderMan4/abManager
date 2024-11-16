import { Minus, Square, X } from "@phosphor-icons/react";
import { FC } from "react";

import { TitleBarMenu } from "./TitleBarMenu";
import { ImportButton, WindowButton } from "./components";

export const TitleBar: FC = () => {
   return (
      <header className={"window-drag select-none h-10"}>
         <div className="flex justify-between items-strech ml-1">
            <TitleBarMenu />
            <div className="flex gap-8">
               <div className="flex p-1 gap-1">
                  <ImportButton />
               </div>
               <div className="flex p-1 gap-1">
                  <WindowButton onClick={window.mainWindow.minimize}>
                     <Minus />
                  </WindowButton>
                  <WindowButton onClick={window.mainWindow.maximize}>
                     <Square />
                  </WindowButton>
                  <WindowButton
                     onClick={window.mainWindow.close}
                     className="hover:bg-red-500"
                  >
                     <X />
                  </WindowButton>
               </div>
            </div>
         </div>
      </header>
   );
};
