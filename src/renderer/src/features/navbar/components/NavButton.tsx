import { Icon } from "@iconify/react";
import { FC, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { cls } from "@/utils/styleUtils";

export type NavButtonProps = {
   icon: string;
   isCollapsed?: boolean;
   children: ReactNode;
} & (
   | {
        navigateTo?: string;
        onClick?: never;
     }
   | {
        navigateTo?: never;
        onClick?: () => void;
     }
);

export const NavButton: FC<NavButtonProps> = ({
   icon,
   isCollapsed,
   navigateTo,
   children,
   onClick,
}) => {
   const { pathname } = useLocation();
   const navigate = useNavigate();

   const handleClick = () => {
      if (navigateTo) {
         navigate(navigateTo);
      } else {
         onClick?.();
      }
   };

   return (
      <button
         onClick={handleClick}
         className={cls(
            "flex gap-3 p-2 pr-5 pl-6 rounded-r-2xl items-center transition-colors duration-200 select-none",
            "hover:bg-radix-gray-a400",
            {
               "bg-radix-indigo-a300 hover:bg-radix-indigo-a400":
                  pathname === navigateTo,
            }
         )}
      >
         <Icon height="2rem" icon={icon} />
         {!isCollapsed && <span>{children}</span>}
      </button>
   );
};
