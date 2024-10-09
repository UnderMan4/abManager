import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { FC, ReactNode } from "react";
import { useLocation } from "react-router-dom";

import { useAppNavigate } from "@/hooks";
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
            "flex gap-3 p-2 pr-5 pl-6 rounded-r-2xl items-center transition-colors duration-200 select-none relative",
            "hover:bg-radix-gray-a400"
         )}
      >
         <Icon className="z-10" height="2rem" icon={icon} />
         {!isCollapsed && <span className="z-10">{children}</span>}
         {pathname === navigateTo && (
            <motion.div
               layoutId="navButton"
               transition={{ duration: 0.2 }}
               className="absolute inset-0 transition-colors duration-200 bg-radix-indigo-400 hover:bg-radix-indigo-500 rounded-r-2xl"
            />
         )}
      </button>
   );
};
