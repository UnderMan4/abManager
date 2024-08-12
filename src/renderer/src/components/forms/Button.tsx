import { Icon } from "@iconify/react";
import { ButtonHTMLAttributes, FC, useMemo } from "react";
import { useFocusRing } from "react-aria";

import { cls } from "@/utils/styleUtils";

export type ButtonAppearance = "solid" | "outlineColor" | "outlineGray";

export type ButtonIconHoverAnimation = keyof typeof iconHoverAnimations;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
   appearance?: ButtonAppearance;
   icon?: ButtonIconOptions;
   mini?: boolean;
};

export type ButtonIconOptions =
   | string
   | {
        name: string;
        position?: "left" | "right";
        size?: number;
        className?: string;
        hoverAnimation?: ButtonIconHoverAnimation;
     };

const iconHoverAnimations = {
   moveRight:
      "group-hover:group-enabled:translate-x-1 transition-transform duration-300 ease-in-out",
   moveLeft:
      "group-hover:group-enabled:-translate-x-1 transition-transform duration-300 ease-in-out",
   moveUp:
      "group-hover:group-enabled:-translate-y-1 transition-transform duration-300 ease-in-out",
   moveDown:
      "group-hover:group-enabled:translate-y-1 transition-transform duration-300 ease-in-out",
   scale: "group-hover:group-enabled:scale-110 transition-transform duration-300 ease-in-out",
   scaleRotate:
      "group-hover:group-enabled:scale-110 group-hover:group-enabled:rotate-12 transition-transform duration-300 ease-in-out",
   none: "",
} as const;

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
   icon,
   appearance = "solid",
   children,
   mini,
   ...props
}) => {
   const iconOptions = useMemo(() => {
      if (!icon) return undefined;
      if (typeof icon === "string") {
         return {
            name: icon,
            iconPosition: "left",
            iconSize: 1.3,
            iconClassName: "",
            iconHoverAnimation: "none",
         };
      }
      return {
         name: icon.name,
         iconPosition: icon.position ?? "left",
         iconSize: (icon.size ?? 1) * 1.3,
         iconClassName: icon.className ?? "",
         iconHoverAnimation: icon.hoverAnimation ?? "none",
      };
   }, [icon]);

   const { isFocusVisible, focusProps } = useFocusRing();
   return (
      <button
         className={cls(
            "font-bold tracking-wide border flex flex-row items-center group outline-none",
            "disabled:bg-radix-gray-500 disabled:text-radix-gray-700 disabled:border-radix-gray-600",
            "dark:disabled:bg-radix-gray-500 dark:disabled:text-radix-gray-700 dark:disabled:border-radix-gray-600",
            appearanceClassNames[appearance],
            hoverClassNames[appearance],
            {
               "ring-2 ring-radix-gray-1200": isFocusVisible,
               "px-4 py-2 rounded-xl gap-2": !mini,
               "px-2 rounded-md gap-1": mini,
            },
            className
         )}
         {...props}
         {...focusProps}
      >
         {iconOptions?.iconPosition === "left" && (
            <Icon
               className={cls(
                  "group-disabled:text-radix-gray-700",
                  iconClassNames[appearance],
                  iconOptions.iconClassName,
                  iconHoverAnimations[iconOptions.iconHoverAnimation]
               )}
               icon={iconOptions.name}
               height={`${iconOptions.iconSize}rem`}
            />
         )}
         {children}
         {iconOptions?.iconPosition === "right" && (
            <Icon
               className={cls(
                  "group-disabled:text-radix-gray-700",
                  iconClassNames[appearance],
                  iconOptions.iconClassName,
                  iconHoverAnimations[iconOptions.iconHoverAnimation]
               )}
               icon={iconOptions.name}
               height={`${iconOptions.iconSize}rem`}
            />
         )}
      </button>
   );
};
