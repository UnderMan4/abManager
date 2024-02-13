import { Icon } from "@iconify/react";
import { ButtonHTMLAttributes, FC } from "react";

import { cls } from "@/utils/styleUtils";

export type ButtonAppearance = "solid" | "outlineColor" | "outlineGray";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
   appearance?: ButtonAppearance;
   icon?: string;
   iconPosition?: "left" | "right";
   iconSize?: number;
   iconClassName?: string;
};

const appearanceClassNames: Record<ButtonAppearance, string> = {
   solid: "border-radix-indigo-1000 bg-radix-indigo-1000 text-white dark:bg-radix-indigo-600 dark:border-radix-indigo-600",
   outlineColor:
      "border-radix-indigo-800 bg-radix-indigo-a400 text-radix-gray-1200 text-radix-gray-1200",
   outlineGray:
      "border-radix-gray-700 text-radix-gray-1200 bg-radix-gray-500 text-radix-gray-1200",
};

const hoverClassNames: Record<ButtonAppearance, string> = {
   solid: "hover:bg-radix-indigo-900 hover:border-radix-indigo-900 dark:hover:bg-radix-indigo-700 dark:hover:border-radix-indigo-700",
   outlineColor: "hover:bg-radix-indigo-a500 hover:border-radix-indigo-800",
   outlineGray: "hover:bg-radix-gray-600 hover:border-radix-gray-700",
};

const iconClassNames: Record<ButtonAppearance, string> = {
   solid: "text-white dark:disabled:text-radix-gray-700",
   outlineColor: "text-radix-gray-1200 dark:disabled:text-radix-gray-700",
   outlineGray: "text-radix-gray-1200 dark:disabled:text-radix-gray-700",
};

export const Button: FC<ButtonProps> = ({
   className,
   iconPosition = "left",
   icon,
   appearance = "solid",
   children,
   iconSize = 1.4,
   iconClassName,
   ...props
}) => {
   return (
      <button
         className={cls(
            "px-4 py-2 rounded-xl font-bold tracking-wide border flex flex-row gap-2 items-center group",
            "disabled:bg-radix-gray-500 disabled:text-radix-gray-700 disabled:border-radix-gray-600",
            "dark:disabled:bg-radix-gray-500 dark:disabled:text-radix-gray-700 dark:disabled:border-radix-gray-600",
            appearanceClassNames[appearance],
            hoverClassNames[appearance],
            className
         )}
         {...props}
      >
         {icon && iconPosition === "left" && (
            <Icon
               className={cls(iconClassNames[appearance], iconClassName)}
               icon={icon}
               height={`${iconSize}rem`}
            />
         )}
         {children}
         {icon && iconPosition === "right" && (
            <Icon
               className={cls(
                  "group-disabled:text-radix-gray-700",
                  iconClassNames[appearance],
                  iconClassName
               )}
               icon={icon}
               height={`${iconSize}rem`}
            />
         )}
      </button>
   );
};
