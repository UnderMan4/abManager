import { Icon } from "@iconify/react";
import { FC } from "react";
import { Link, useLocation, useRoutes } from "react-router-dom";

import { cls } from "@/utils/styleUtils";

export type NavButtonProps = {
   icon: string;
   isCollapsed?: boolean;
   navigateTo: string;
   children: string;
};

export const NavButton: FC<NavButtonProps> = ({
   icon,
   isCollapsed,
   navigateTo,
   children,
}) => {
   const { pathname } = useLocation();
   return (
      <Link
         to={navigateTo}
         className={cls(
            "flex gap-3 p-2 pr-5 rounded-r-2xl items-center",
            "hover:bg-radix-gray-a400",
            {
               "bg-radix-indigo-a300 hover:bg-radix-indigo-a400":
                  pathname === navigateTo,
            }
         )}
      >
         <Icon height="2rem" icon={icon} />
         {!isCollapsed && <span>{children}</span>}
      </Link>
   );
};
