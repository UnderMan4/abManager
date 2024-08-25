import React, { FC } from "react";

import { RoundProgressBar } from "@/components/common";
import { WindowButton } from "@/features/titleBar/components/WindowButton";
import { cls } from "@/utils/styleUtils";

export type TitleBarProps = {
   className?: string;
};

export const TitleBar: FC<TitleBarProps> = ({ className }) => {
   return (
      <div
         className={cls(
            "flex justify-between window-drag select-none bg-radix-gray-a200 grow items-strech",
            className
         )}
      >
         <div>menu</div>
         <div className="flex gap-8">
            <div className="center">
               <RoundProgressBar
                  icon="ph:upload-simple-bold"
                  progressMax={100}
                  progressValue={80}
                  className="size-6"
               />
            </div>
            <div className="flex p-1 gap-1">
               <WindowButton button="minimize" />
               <WindowButton button="maximize" />
               <WindowButton button="close" />
            </div>
         </div>
      </div>
   );
};
