import { Icon } from "@iconify/react";
import { FC } from "react";

import { ImportButton, WindowButton } from "./components";

export const TitleBar: FC = () => {
   return (
      <div
         className={
            "flex justify-between window-drag select-none grow items-strech"
         }
      >
         <div>menu</div>
         <div className="flex gap-8">
            <div className="flex p-1 gap-1">
               <ImportButton />
            </div>
            <div className="flex p-1 gap-1">
               <WindowButton onClick={window.mainWindow.minimize}>
                  <Icon icon="ph:minus-bold" />
               </WindowButton>
               <WindowButton onClick={window.mainWindow.maximize}>
                  <Icon icon="ph:square-bold" />
               </WindowButton>
               <WindowButton
                  onClick={window.mainWindow.close}
                  className="hover:bg-red-500"
               >
                  <Icon icon="ph:x-bold" />
               </WindowButton>
            </div>
         </div>
      </div>
   );
};
