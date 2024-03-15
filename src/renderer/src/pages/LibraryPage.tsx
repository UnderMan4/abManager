import { FC } from "react";

import { Button } from "@/components/common";
import { FirstSetup } from "@/features/firstSetup";
import { useSettingsStore } from "@/stores";

export const LibraryPage: FC = () => {
   const { libraryPath } = useSettingsStore();

   return (
      <>
         {libraryPath ? (
            <div className="h-full w-full flex items-center justify-center">
               <Button
                  onClick={() =>
                     useSettingsStore.setState({
                        saveType: "copy",
                        libraryPath: undefined,
                     })
                  }
               >
                  Clear settings
               </Button>
            </div>
         ) : (
            <FirstSetup />
         )}
      </>
   );
};
