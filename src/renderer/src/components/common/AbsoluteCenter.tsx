import React, { FC } from "react";
import { twMerge } from "tailwind-merge";

export type AbsoluteCenterProps = {
   className?: string;
   children?: React.ReactNode | React.ReactNode[];
};

export const AbsoluteCenter: FC<AbsoluteCenterProps> = ({
   className,
   children,
}) => {
   return (
      <div
         className={twMerge(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            className
         )}
      >
         {children}
      </div>
   );
};
