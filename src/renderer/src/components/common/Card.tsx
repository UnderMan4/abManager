import { FC, HTMLAttributes, RefObject } from "react";

import { Button, ButtonProps } from "@/components/ui";
import { cls } from "@/utils/styleUtils";

import { Heading } from "./Heading";

export type CardButtonProps = Omit<ButtonProps, "children"> & {
   label: string;
   icon?: React.ReactNode;
   iconPosition?: "left" | "right";
};

export type CardProps = HTMLAttributes<HTMLDivElement> & {
   title?: string;
   titleId?: string;
   contentClassName?: string;
   leftButton?: CardButtonProps;
   rightButton?: CardButtonProps;
   contentRef?: RefObject<HTMLDivElement>;
};

const CardButton: FC<CardButtonProps> = ({
   label,
   icon,
   iconPosition,
   ...props
}) => {
   if (!icon) return <Button {...props}>{label}</Button>;

   return (
      <Button {...props}>
         {iconPosition === "left" && icon}
         {label}
         {iconPosition !== "left" && icon}
      </Button>
   );
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
            "p-4 px-6 pb-6 bg-background border border-primary/40 rounded-2xl flex flex-col gap-8 overflow-hidden",
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
               <div>{leftButton && <CardButton {...leftButton} />}</div>
               <div>{rightButton && <CardButton {...rightButton} />}</div>
            </div>
         )}
      </div>
   );
};
