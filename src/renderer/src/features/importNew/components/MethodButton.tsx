import { Icon } from "@iconify/react";
import { ReactNode, forwardRef, useMemo } from "react";
import { useFocusRing } from "react-aria";

import { cls } from "@/utils/styleUtils";

export type MethodButtonProps = {
   icon: string;
   onClick: () => void;
   children: ReactNode;
   maxHeight: number;
   maxWidth: number;
};

const ICON_SCALE = 0.4;
const FONT_SCALE = 0.07;
const BORDER_RADIUS_SCALE = 0.1;
const ASPECT_RATIO = 10 / 14;

export const MethodButton = forwardRef<HTMLButtonElement, MethodButtonProps>(
   ({ icon, onClick, children, maxHeight, maxWidth }, ref) => {
      const { isFocusVisible, focusProps } = useFocusRing();

      const { height, width } = useMemo(() => {
         let width = maxWidth;
         let height = maxHeight;

         if (maxWidth / maxHeight > ASPECT_RATIO) {
            width = maxHeight * ASPECT_RATIO;
         } else {
            height = maxWidth / ASPECT_RATIO;
         }

         return { width, height };
      }, [maxHeight, maxWidth]);
      return (
         <button
            onClick={onClick}
            className={cls(
               "bg-radix-gray-400 p-5 flex flex-col items-center justify-center gap-7 transition-colors duration-200 shrink-0",
               "group outline-none",
               "hover:bg-radix-gray-500",
               {
                  "ring-2 ring-radix-gray-1200 bg-radix-gray-500":
                     isFocusVisible,
               }
            )}
            {...focusProps}
            ref={ref}
            style={{
               width: `${width}rem`,
               height: `${height}rem`,
               borderRadius: `${width * BORDER_RADIUS_SCALE}rem`,
            }}
         >
            <div
               className="relative"
               style={{
                  width: `${ICON_SCALE * width}rem`,
                  height: `${ICON_SCALE * height}rem`,
               }}
            >
               <Icon
                  className={cls(
                     "absolute inset-0 transition-transform duration-200 pointer-events-none",
                     "group-hover:scale-125",
                     {
                        "transform scale-125": isFocusVisible,
                     }
                  )}
                  icon={icon}
                  height={`${ICON_SCALE * width}rem`}
               />
            </div>
            <span
               className="font-bold uppercase"
               style={{ fontSize: `${Math.max(FONT_SCALE * width, 1.1)}rem` }}
            >
               {children}
            </span>
         </button>
      );
   }
);
