import { FC } from "react";
import { FormattedMessage } from "react-intl";

import { NavButton } from "@/features/navbar/components/NavButton";

export const NavBar: FC = () => {
   return (
      <aside className="p-3 pl-0 flex justify-between flex-col min-w-52 w-52 max-w-52 grow-0 shrink-0 basis-52 box-border min-h-0">
         <div className="flex flex-col gap-2">
            <NavButton icon="ph:house-bold" navigateTo="/">
               <FormattedMessage id="navbar.buttons.dashboard" />
            </NavButton>
            <NavButton icon="ph:books-bold" navigateTo="/library">
               <FormattedMessage id="navbar.buttons.library" />
            </NavButton>
            <NavButton icon="ph:gear-six-bold" navigateTo="/settings">
               <FormattedMessage id="navbar.buttons.settings" />
            </NavButton>
            {process.env.NODE_ENV === "development" && (
               <NavButton icon="ph:cheers-bold" navigateTo="/playground">
                  Playground
               </NavButton>
            )}
         </div>
         <NavButton icon="ph:plus-bold" navigateTo="/import-new/method">
            <FormattedMessage id="navbar.buttons.addNew" />
         </NavButton>
      </aside>
   );
};
