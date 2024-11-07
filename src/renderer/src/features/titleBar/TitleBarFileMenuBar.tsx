import { FC, useState } from "react";
import { FormattedMessage } from "react-intl";

import {
   Dialog,
   DialogContent,
   DialogTrigger,
   MenubarContent,
   MenubarItem,
   MenubarMenu,
   MenubarSub,
   MenubarSubContent,
   MenubarSubTrigger,
   MenubarTrigger,
} from "@/components/ui";
import { ImportNewFile, ImportNewFolder } from "@/features/importNew";
import { cls } from "@/utils/styleUtils";

type DialogType = "importFiles" | "importFolder";

export const TitleBarFileMenuBar: FC = () => {
   const [dialogType, setDialogType] = useState<DialogType | null>(null);

   const [isFilesSelected, setIsFilesSelected] = useState(false);

   const [isDialogOpen, setIsDialogOpen] = useState(false);

   return (
      <Dialog
         onOpenChange={(value) => {
            setIsDialogOpen(value);
            setIsFilesSelected(false);
         }}
         open={isDialogOpen}
      >
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
                     <DialogTrigger asChild>
                        <MenubarItem
                           onSelect={() => setDialogType("importFiles")}
                        >
                           <FormattedMessage id="menubar.menu.file.import.files" />
                        </MenubarItem>
                     </DialogTrigger>
                     <DialogTrigger asChild>
                        <MenubarItem
                           onSelect={() => setDialogType("importFolder")}
                        >
                           <FormattedMessage id="menubar.menu.file.import.directory" />
                        </MenubarItem>
                     </DialogTrigger>
                  </MenubarSubContent>
               </MenubarSub>
            </MenubarContent>
         </MenubarMenu>
         <DialogContent
            className={cls({
               // "max-w-[min(calc(100vw-10rem),75rem)]": isFilesSelected,
            })}
         >
            {dialogType === "importFiles" ? (
               <ImportNewFile setIsFilesSelected={setIsFilesSelected} />
            ) : dialogType === "importFolder" ? (
               <ImportNewFolder />
            ) : null}
         </DialogContent>
      </Dialog>
   );
};
