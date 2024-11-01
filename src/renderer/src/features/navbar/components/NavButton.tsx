import { FC, ReactNode } from "react";
import { useLocation } from "react-router-dom";

import { useAppNavigate } from "@/hooks";
import { cls } from "@/utils/styleUtils";

export type NavButtonProps = {
   icon: ReactNode;
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
   const navigate = useAppNavigate();

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
            "flex gap-3 p-2 pr-5 pl-6 rounded-r-2xl items-center transition-colors duration-300 select-none relative text-primary-950 font-semibold",
            "hover:bg-primary/25",
            {
               "bg-primary text-primary-50 hover:bg-primary/85":
                  pathname === navigateTo,
            }
         )}
      >
         {icon}
         {/* <Icon className="z-10" height="2rem" icon={icon} /> */}
         {!isCollapsed && <span className="z-10">{children}</span>}
      </button>
   );
};
