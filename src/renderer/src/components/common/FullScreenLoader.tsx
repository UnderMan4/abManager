import { Icon } from "@iconify/react";
import { FC } from "react";

import { cls } from "@/utils/styleUtils";

export type FullScreenLoaderProps = {
   className?: string;
};

export const FullScreenLoader: FC<FullScreenLoaderProps> = ({ className }) => {
   return (
      <div
         className={cls(
            "absolute inset-0 flex items-center justify-center",
            className
         )}
      >
         <Icon icon="svg-spinners:90-ring" height="3rem" />
      </div>
   );
};
