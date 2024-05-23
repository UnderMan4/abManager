import { FC, useRef } from "react";

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
               Dashboard
            </NavButton>
            <NavButton icon="ph:books-bold" navigateTo="/library">
               Library
            </NavButton>
            <NavButton icon="ph:gear-six-bold" navigateTo="/settings">
               Settings
            </NavButton>
         </div>
         <NavButton
            icon="ph:plus-bold"
            onClick={() => modalRef.current?.open()}
         >
            Add new
         </NavButton>
         <AddNewModal ref={modalRef} />
      </div>
   );
};
