import { FC } from "react";

import { NavButton } from "@/features/library/components/NavButton";

export type NavBarProps = {};

export const NavBar: FC<NavBarProps> = ({}) => {
   return (
      <div className="bg-radix-gray-a200 rounded-r-3xl my-2 p-3 pl-0">
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
         {/* <Button
            onClick={() =>
               useSettingsStore.setState({
                  saveType: "copy",
                  libraryPath: undefined,
               })
            }
         >
            Clear settings
         </Button> */}
      </div>
   );
};
