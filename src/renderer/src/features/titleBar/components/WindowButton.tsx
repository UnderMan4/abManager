import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";

import { cls } from "@/utils/styleUtils";

export type WindowButtonVariant = "minimize" | "maximize" | "close";

export type WindowButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
   children?: ReactNode;
};

export const WindowButton = forwardRef<HTMLButtonElement, WindowButtonProps>(
   ({ children, className, ...props }, ref) => {
      return (
         <button
            ref={ref}
            className={cls(
               "w-10 h-full transition-colors duration-100 rounded-md center",
               "hover:bg-radix-gray-600",
               className
            )}
            tabIndex={-1}
            {...props}
         >
            {children}
         </button>
      );
   }
);
