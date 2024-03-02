import { Dispatch, FC, SetStateAction, useEffect } from "react";

import { FolderSelector } from "@/components/common";
import { LIBRARY_DIRECTORY_NAME } from "@/constants";
import { FirstSetupCard } from "@/features/firstSetup/FirstSetupCard";
import { CardNavigation } from "@/features/firstSetup/types";

export type SelectDirectoryCardProps = {
   cardNavigation: CardNavigation;

   selectedDirectory: string | undefined;
   setSelectedDirectory: Dispatch<SetStateAction<string | undefined>>;
};

export const SelectDirectoryCard: FC<SelectDirectoryCardProps> = ({
   cardNavigation,
   selectedDirectory,
   setSelectedDirectory,
}) => {
   useEffect(() => {
      if (!selectedDirectory) return;
      const diskStats = window.fs.getDiskStats(selectedDirectory);

      if ("error" in diskStats) return;
   }, [selectedDirectory]);

   return (
      <FirstSetupCard
         cardNavigation={cardNavigation}
         isVisible={cardNavigation.currentStep === 1}
         title="Select path to your library"
         backButtonLabel="Back"
         nextButtonLabel="Next"
         nextButtonActive={!!selectedDirectory && selectedDirectory !== ""}
      >
         <FolderSelector
            className="w-96"
            value={selectedDirectory}
            onChange={(value) => {
               const lastDirectory = window.path.parse(value.path).base;

               if (!lastDirectory) return;

               if (lastDirectory === LIBRARY_DIRECTORY_NAME) {
                  setSelectedDirectory(value.path);
                  return;
               }

               setSelectedDirectory(
                  window.path.join(value.path, LIBRARY_DIRECTORY_NAME)
               );
            }}
         />
      </FirstSetupCard>
   );
};
