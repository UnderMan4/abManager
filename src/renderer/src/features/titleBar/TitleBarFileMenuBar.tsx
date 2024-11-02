import { FC } from "react";
import { FormattedMessage } from "react-intl";

import {
   MenubarContent,
   MenubarItem,
   MenubarMenu,
   MenubarSub,
   MenubarSubContent,
   MenubarSubTrigger,
   MenubarTrigger,
} from "@/components/ui";

export const TitleBarFileMenuBar: FC = () => {
   return (
      <MenubarMenu>
         <MenubarTrigger>
            <FormattedMessage id="menubar.menu.file.label" />
         </MenubarTrigger>
         <MenubarContent>
            <MenubarSub>
               <MenubarSubTrigger>
                  <FormattedMessage id="menubar.menu.file.import.label" />
               </MenubarSubTrigger>
               <MenubarSubContent>
                  <MenubarItem>
                     <FormattedMessage id="menubar.menu.file.import.files" />
                  </MenubarItem>
                  <MenubarItem disabled>
                     <FormattedMessage id="menubar.menu.file.import.directory" />
                  </MenubarItem>
               </MenubarSubContent>
            </MenubarSub>
         </MenubarContent>
      </MenubarMenu>
   );
};
