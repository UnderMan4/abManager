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

import { useImportFiles } from "./hooks";

type DialogType = "importFiles" | "importFolder";

export const TitleBarFileMenuBar: FC = () => {
   const [dialogType, setDialogType] = useState<DialogType | null>(null);

   const importFiles = useImportFiles();

   return (
      <Dialog
         onOpenChange={(value) => {
            importFiles.setIsDialogOpen(value);
         }}
         open={importFiles.isDialogOpen}
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
                     <MenubarItem
                        onSelect={() => setDialogType("importFiles")}
                        onClick={() => importFiles.selectFiles()}
                     >
                        <FormattedMessage id="menubar.menu.file.import.files" />
                     </MenubarItem>
                     <MenubarItem
                        onSelect={() => setDialogType("importFolder")}
                     >
                        <FormattedMessage id="menubar.menu.file.import.directory" />
                     </MenubarItem>
                  </MenubarSubContent>
               </MenubarSub>
            </MenubarContent>
         </MenubarMenu>
         <DialogContent>
            {dialogType === "importFiles" ? (
               <ImportNewFile importFiles={importFiles} />
            ) : dialogType === "importFolder" ? (
               <ImportNewFolder />
            ) : null}
         </DialogContent>
      </Dialog>
   );
};
