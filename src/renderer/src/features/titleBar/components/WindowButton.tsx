import { Icon } from "@iconify/react";
import React, { FC } from "react";

import { cls } from "@/utils/styleUtils";

export type WindowButtonVariant = "minimize" | "maximize" | "close";

export type WindowButtonProps = {
   button: WindowButtonVariant;
};

const actionMap: Record<WindowButtonVariant, () => void> = {
   minimize: () => {
      window.mainWindow.minimize();
   },
   maximize: () => {
      window.mainWindow.maximize();
   },
   close: () => {
      window.mainWindow.close();
   },
};

const iconMap: Record<WindowButtonVariant, string> = {
   minimize: "ph:minus-bold",
   maximize: "ph:square-bold",
   close: "ph:x-bold",
};

export const WindowButton: FC<WindowButtonProps> = ({ button }) => {
   return (
      <button
         className={cls(
            "w-10 h-full transition-colors duration-100 rounded-md",
            {
               "hover:bg-red-500": button === "close",
               "hover:bg-radix-gray-600": button !== "close",
            }
         )}
         onClick={actionMap[button]}
         tabIndex={-1}
      >
         <Icon icon={iconMap[button]} className="mx-auto" height="0.9rem" />
      </button>
   );
};
