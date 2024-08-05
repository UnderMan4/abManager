import { Icon } from "@iconify/react";
import { ButtonHTMLAttributes, FC } from "react";

import { ButtonAppearance } from "@/components/forms/Button";
import { cls } from "@/utils/styleUtils";

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
   className?: string;
   icon: string;
   appearance?: ButtonAppearance;
};

const appearanceClassNames: Record<ButtonAppearance, string> = {
   solid: "border-radix-indigo-1000 bg-radix-indigo-1000 text-white dark:bg-radix-indigo-600 dark:border-radix-indigo-600",
   outlineColor:
      "border-radix-indigo-800 bg-radix-indigo-a400 text-radix-gray-1200 text-radix-gray-1200",
   outlineGray:
      "border-radix-gray-700 text-radix-gray-1200 bg-radix-gray-500 text-radix-gray-1200",
};

export const IconButton: FC<IconButtonProps> = ({
   className,
   icon,
   appearance = "solid",
   ...props
}) => {
   return (
      <button
         className={cls(
            "p-2 rounded-xl",
            appearanceClassNames[appearance],
            className
         )}
         {...props}
      >
         <div className="center size-[1.3rem]">
            <Icon icon={icon} className="" height="43rem" />
         </div>
      </button>
   );
};
