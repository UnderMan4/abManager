import { Icon } from "@iconify/react";
import { FC, ReactNode } from "react";
import { useFocusRing } from "react-aria";

import { cls } from "@/utils/styleUtils";

export type MethodButtonProps = {
   icon: string;
   onClick: () => void;
   children: ReactNode;
};

export const MethodButton: FC<MethodButtonProps> = ({
   icon,
   onClick,
   children,
}) => {
   const { isFocusVisible, focusProps } = useFocusRing();
   return (
      <button
         onClick={onClick}
         className={cls(
            "bg-radix-gray-400 p-5 rounded-2xl h-60 w-48 flex flex-col items-center justify-center gap-7 transition-colors duration-200",
            "group outline-none",
            "hover:bg-radix-gray-500",
            {
               "ring-2 ring-radix-gray-1200 bg-radix-gray-500": isFocusVisible,
            }
         )}
         {...focusProps}
      >
         <div className="relative size-16">
            <Icon
               className={cls(
                  "absolute inset-0 transition-transform duration-200",
                  "group-hover:scale-125",
                  {
                     "transform scale-125": isFocusVisible,
                  }
               )}
               icon={icon}
               height="4rem"
            />
         </div>
         <span className="text-xl font-bold uppercase">{children}</span>
      </button>
   );
};
