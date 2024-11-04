import { FC } from "react";

import { cls } from "@/utils/styleUtils";

export type FlexboxProps = {
   className?: string;
   children?: React.ReactNode | React.ReactNode[];
   column?: boolean;
};

export const Flexbox: FC<FlexboxProps> = ({ className, column, children }) => (
   <div
      className={cls(
         "flex gap-4",
         {
            "flex-col": column,
         },
         className
      )}
   >
      {children}
   </div>
);
