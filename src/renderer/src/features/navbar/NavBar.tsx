import { Books, Cheers, GearSix, Plus } from "@phosphor-icons/react";
import { House } from "@phosphor-icons/react/dist/ssr";
import { FC } from "react";
import { FormattedMessage } from "react-intl";

import { NAVBAR_ICON_SIZE } from "@/constants";
import { NavButton } from "@/features/navbar/components/NavButton";

export const NavBar: FC = () => {
   return (
      <aside className="p-3 pl-0 flex justify-between flex-col min-w-52 w-52 max-w-52 grow-0 shrink-0 basis-52 box-border min-h-0">
         <div className="flex flex-col gap-2">
            <NavButton
               icon={<House weight="bold" size={NAVBAR_ICON_SIZE} />}
               navigateTo="/"
            >
               <FormattedMessage id="navbar.buttons.dashboard" />
            </NavButton>
            <NavButton
               icon={<Books weight="bold" size={NAVBAR_ICON_SIZE} />}
               navigateTo="/library"
            >
               <FormattedMessage id="navbar.buttons.library" />
            </NavButton>
            <NavButton
               icon={<GearSix weight="bold" size={NAVBAR_ICON_SIZE} />}
               navigateTo="/settings"
            >
               <FormattedMessage id="navbar.buttons.settings" />
            </NavButton>
            {process.env.NODE_ENV === "development" && (
               <NavButton
                  icon={<Cheers weight="bold" size={NAVBAR_ICON_SIZE} />}
                  navigateTo="/playground"
               >
                  Playground
               </NavButton>
            )}
         </div>
         <NavButton
            icon={<Plus weight="bold" size={NAVBAR_ICON_SIZE} />}
            navigateTo="/import-new/method"
         >
            <FormattedMessage id="navbar.buttons.addNew" />
         </NavButton>
      </aside>
   );
};
