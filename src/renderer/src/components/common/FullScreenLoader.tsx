import { Icon } from "@iconify/react";
import { FC } from "react";

import { cls } from "@/utils/styleUtils";

export type FullscreenLoaderProps = {
   className?: string;
   translucent?: boolean;
   description?: string;
};

export const FullscreenLoader: FC<FullscreenLoaderProps> = ({
   className,
   translucent,
   description,
}) => {
   return (
      <div
         className={cls(
            "absolute inset-0 flex flex-col items-center justify-center z-20 gap-4",
            {
               "bg-black/20 backdrop-blur-sm": translucent,
            },
            className
         )}
      >
         <Icon icon="svg-spinners:90-ring" height="3rem" />
         <p className="max-w-lg font-bold text-xl text-center">{description}</p>
      </div>
   );
};
