import { FC, useRef } from "react";
import { FormattedMessage } from "react-intl";

import {
   AddNewModal,
   AddNewModalRef,
} from "@/features/navbar/components/AddNewModal";
import { NavButton } from "@/features/navbar/components/NavButton";

export const NavBar: FC = () => {
   const modalRef = useRef<AddNewModalRef>(null);
   return (
      <div className="bg-radix-gray-a200 rounded-r-3xl p-3 pl-0 flex justify-between flex-col min-w-52">
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
         <NavButton
            icon="ph:plus-bold"
            onClick={() => modalRef.current?.open()}
         >
            <FormattedMessage id="navbar.buttons.addNew" />
         </NavButton>
         {/* <AddNewModal ref={modalRef} /> */}
      </div>
   );
};
