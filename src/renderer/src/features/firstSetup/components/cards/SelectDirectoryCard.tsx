import { FC, useEffect } from "react";

import { FolderSelector } from "@/components/common";
import { LIBRARY_DIRECTORY_NAME } from "@/constants";
import { FirstSetupCard } from "@/features/firstSetup/components/FirstSetupCard";
import { useFirstSetupContext } from "@/features/firstSetup/components/FirstSetupContext";

export const SelectDirectoryCard: FC = () => {
   const { data, setData } = useFirstSetupContext();
   useEffect(() => {
      if (!data.selectedDirectory) return;
      const diskStats = window.fs.getDiskStats(data.selectedDirectory);

      if ("error" in diskStats) return;
   }, [data.selectedDirectory]);

   return (
      <FirstSetupCard
         cardNumber={1}
         title="Select path to your library"
         backButtonLabel="Back"
         nextButtonLabel="Next"
         nextButtonActive={
            !!data.selectedDirectory && data.selectedDirectory !== ""
         }
      >
         <FolderSelector
            className="w-96"
            value={data.selectedDirectory}
            onChange={(value) => {
               const lastDirectory = window.path.parse(value.path).base;

               if (!lastDirectory) return;

               if (lastDirectory === LIBRARY_DIRECTORY_NAME) {
                  setData({ selectedDirectory: value.path });
                  return;
               }

               setData({
                  selectedDirectory: window.path.join(
                     value.path,
                     LIBRARY_DIRECTORY_NAME
                  ),
               });
            }}
         />
      </FirstSetupCard>
   );
};
