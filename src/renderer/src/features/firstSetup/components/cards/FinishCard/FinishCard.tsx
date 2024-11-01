import { ArrowLeft, Check } from "@phosphor-icons/react";
import { FC, useRef, useState } from "react";

import { Button } from "@/components/ui";
import { FirstSetupCard } from "@/features/firstSetup/components/FirstSetupCard";
import { ConfirmItem } from "@/features/firstSetup/components/cards/FinishCard/ConfirmItem";
import { useFirstSetupContext } from "@/hooks/contexts/useFirstSetupContext";
import { useSettingsStore } from "@/stores";

export const FinishCard: FC = () => {
   const { data, navigation } = useFirstSetupContext();
   const isDataValid = data.selectedDirectory && data.selectedSaveType;
   const { firstSetup } = useSettingsStore();

   const cardContentRef = useRef<HTMLDivElement>(null);

   const [isErrorCreatingLibrary, setIsErrorCreatingLibrary] = useState(false);
   return (
      <FirstSetupCard
         cardNumber={3}
         title="Confirm settings"
         contentRef={cardContentRef}
      >
         <div className="flex flex-col gap-3">
            <ConfirmItem
               label="Library directory"
               icon="ph:folder-bold"
               value={data.selectedDirectory}
            />
            <ConfirmItem
               label="Save type"
               icon="ph:floppy-disk-bold"
               value={data.selectedSaveType}
            />
         </div>
         <div className="mt-8 flex flex-col gap-3">
            {isErrorCreatingLibrary && (
               <p className="text-sm text-radix-red-900">
                  Error while creating library. Please try again or select a
                  different directory.
               </p>
            )}
            <div className="flex justify-between">
               <Button
                  onClick={navigation.previousStep}
                  onMouseEnter={() => navigation.setIsBack(true)}
                  onFocusCapture={() => navigation.setIsBack(true)}
                  variant="outline"
               >
                  <ArrowLeft />
                  Back
               </Button>
               <Button
                  disabled={!isDataValid}
                  onClick={() => {
                     if (!isDataValid) return;

                     const result = window.fs.createDirectory(
                        data.selectedDirectory!
                     );

                     if ("error" in result || !result.success) {
                        setIsErrorCreatingLibrary(true);
                        return;
                     }

                     firstSetup({
                        libraryPath: data.selectedDirectory!,
                        saveType: data.selectedSaveType,
                     });
                  }}
               >
                  Finish
                  <Check />
               </Button>
            </div>
         </div>
      </FirstSetupCard>
   );
};
