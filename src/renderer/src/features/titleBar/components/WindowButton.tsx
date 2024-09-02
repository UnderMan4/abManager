import { ButtonHTMLAttributes, FC, ReactNode } from "react";

import { cls } from "@/utils/styleUtils";

export type WindowButtonVariant = "minimize" | "maximize" | "close";

export type WindowButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
   children?: ReactNode;
};

export const WindowButton: FC<WindowButtonProps> = ({
   children,
   className,
   ...props
}) => {
   return (
      <button
         className={cls(
            "w-10 h-full transition-colors duration-100 rounded-md center",
            "hover:bg-radix-gray-600",
            className
         )}
         {...props}
         tabIndex={-1}
      >
         {children}
      </button>
   );
};
