import { FC, HTMLAttributes, RefObject } from "react";

import { Button, ButtonProps } from "@/components/forms/Button";
import { cls } from "@/utils/styleUtils";

import { Heading } from "./Heading";

export type CardButtonProps = Omit<ButtonProps, "children"> & {
   label: string;
};

export type CardProps = HTMLAttributes<HTMLDivElement> & {
   title?: string;
   titleId?: string;
   contentClassName?: string;
   leftButton?: CardButtonProps;
   rightButton?: CardButtonProps;
   contentRef?: RefObject<HTMLDivElement>;
};

export const Card: FC<CardProps> = ({
   className,
   title,
   children,
   contentClassName,
   leftButton,
   rightButton,
   contentRef,
   titleId,
   ...props
}) => {
   return (
      <div
         className={cls(
            "p-4 px-6 pb-6 bg-radix-gray-300 border border-radix-gray-700 rounded-2xl flex flex-col gap-8 overflow-hidden",
            className
         )}
         {...props}
      >
         {title && (
            <Heading as="h3" id={titleId}>
               {title}
            </Heading>
         )}
         <div
            className={cls(
               contentClassName,
               "custom-scrollbar max-h-full overflow-y-auto"
            )}
            ref={contentRef}
         >
            {children}
         </div>
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
