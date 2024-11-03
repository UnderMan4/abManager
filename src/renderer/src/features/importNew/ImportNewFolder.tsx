import { FC } from "react";
import { FormattedMessage } from "react-intl";

import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui";

export const ImportNewFolder: FC = () => {
   return (
      <>
         <DialogHeader>
            <DialogTitle>
               <FormattedMessage id="importNew.pages.importFolder" />
            </DialogTitle>
            <DialogDescription>new folder</DialogDescription>
         </DialogHeader>
         <div className="overflow-x-auto"></div>
      </>
   );
};
