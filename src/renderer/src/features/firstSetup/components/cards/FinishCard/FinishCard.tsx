import { FC, useEffect, useRef, useState } from "react";

import { Button } from "@/components/common";
import { FirstSetupCard } from "@/features/firstSetup/components/FirstSetupCard";
import { useFirstSetupContext } from "@/features/firstSetup/components/FirstSetupContext";
import { ConfirmItem } from "@/features/firstSetup/components/cards/FinishCard/ConfirmItem";
import { useSettingsStore } from "@/stores";

export const FinishCard: FC = () => {
   const { data, navigation } = useFirstSetupContext();
   const isDataValid = data.selectedDirectory && data.selectedSaveType;
   const { firstSetup } = useSettingsStore();

   const cardContentRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (cardContentRef.current) {
      }
   }, [cardContentRef]);

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
                  appearance="outlineGray"
                  icon={{
                     name: "ph:arrow-left-bold",
                     hoverAnimation: "moveLeft",
                     position: "left",
                  }}
               >
                  Back
               </Button>
               <Button
                  icon={{
                     name: "ph:check-bold",
                     position: "right",
                     hoverAnimation: "scaleRotate",
                  }}
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
               </Button>
            </div>
         </div>
      </FirstSetupCard>
   );
};
