import { FC, HTMLAttributes } from "react";

import { cls } from "@/utils/styleUtils";

import { Heading } from "./Heading";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
   title?: string;
   contentClassName?: string;
};

export const Card: FC<CardProps> = ({
   className,
   title,
   children,
   contentClassName,
   ...props
}) => {
   return (
      <div
         className={cls(
            "p-4 bg-radix-gray-a200 border border-radix-gray-700 rounded-2xl flex flex-col gap-3",
            className
         )}
         {...props}
      >
         {title && <Heading as="h3">{title}</Heading>}
         <div className={contentClassName}>{children}</div>
      </div>
   );
};
