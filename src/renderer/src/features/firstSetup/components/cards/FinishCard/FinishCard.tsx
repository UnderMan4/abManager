import { FC } from "react";

import { Button } from "@/components/common";
import { FirstSetupCard } from "@/features/firstSetup/components/FirstSetupCard";
import { useFirstSetupContext } from "@/features/firstSetup/components/FirstSetupContext";
import { ConfirmItem } from "@/features/firstSetup/components/cards/FinishCard/ConfirmItem";
import { useSettingsStore } from "@/stores";

export const FinishCard: FC = () => {
   const { data } = useFirstSetupContext();
   const isDataValid = data.selectedDirectory && data.selectedSaveType;
   const { firstSetup } = useSettingsStore();
   return (
      <FirstSetupCard cardNumber={3} title="Confirm settings">
         <div className="flex flex-col gap-3">
            <ConfirmItem icon="ph:folder-bold" value={data.selectedDirectory} />
            <ConfirmItem
               icon="ph:floppy-disk-bold"
               value={data.selectedSaveType}
            />
            <div className="flex justify-end">
               <Button
                  icon={{
                     name: "ph:check-bold",
                     position: "right",
                     hoverAnimation: "scaleRotate",
                  }}
                  disabled={!isDataValid}
                  onClick={() => {
                     if (!isDataValid) return;
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
