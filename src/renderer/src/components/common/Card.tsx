import { FC, HTMLAttributes } from "react";

import { Button, ButtonProps } from "@/components/common/Button";
import { cls } from "@/utils/styleUtils";

import { Heading } from "./Heading";

export type CardButtonProps = Omit<ButtonProps, "children"> & {
   label: string;
};

export type CardProps = HTMLAttributes<HTMLDivElement> & {
   title?: string;
   contentClassName?: string;
   leftButton?: CardButtonProps;
   rightButton?: CardButtonProps;
};

export const Card: FC<CardProps> = ({
   className,
   title,
   children,
   contentClassName,
   leftButton,
   rightButton,
   ...props
}) => {
   return (
      <div
         className={cls(
            "p-4 px-6 pb-6 bg-radix-gray-a200 border border-radix-gray-700 rounded-2xl flex flex-col gap-8",
            className
         )}
         {...props}
      >
         {title && (
            <Heading className="" as="h3">
               {title}
            </Heading>
         )}
         <div className={contentClassName}>{children}</div>
         {(leftButton || rightButton) && (
            <div className="flex justify-between">
               <div>
                  {leftButton && (
                     <Button {...leftButton}>{leftButton.label}</Button>
                  )}
               </div>
               <div>
                  {rightButton && (
                     <Button {...rightButton}>{rightButton.label}</Button>
                  )}
               </div>
            </div>
         )}
      </div>
   );
};
