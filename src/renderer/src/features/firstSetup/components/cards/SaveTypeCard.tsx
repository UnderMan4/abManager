import { FC } from "react";

import { RadioGroup } from "@/components/forms/RadioGroup";
import { RadioButton } from "@/components/forms/RadioGroup/RadioButton";
import { FirstSetupCard } from "@/features/firstSetup/components/FirstSetupCard";
import { useFirstSetupContext } from "@/hooks/contexts/useFirstSetupContext";
import { SaveType } from "@/types/common";

export const SaveTypeCard: FC = () => {
   const { setData, data } = useFirstSetupContext();
   return (
      <FirstSetupCard
         cardNumber={2}
         backButtonLabel="Back"
         nextButtonLabel="Next"
         title="Select save type"
         nextButtonActive={true}
      >
         <RadioGroup
            className="flex flex-col gap-5"
            defaultValue={data.selectedSaveType}
            onChange={(e) => {
               setData({ selectedSaveType: e as SaveType });
            }}
         >
            <RadioButton
               label="Copy all audiobooks (recommended)"
               value="copy"
               description="Copies all audiobooks to the selected location. The original files will remain in their current location."
            />
            <RadioButton
               label="Move all audiobooks"
               value="move"
               description="Moves all audiobooks to the selected location. The original files will be removed from their current location."
            />
            <RadioButton
               label="Add links"
               value="link"
               description="Adds links to the audiobooks without moving or copying them. Keep in mind that if you delete the original files, the links will be broken."
            />
         </RadioGroup>
      </FirstSetupCard>
   );
};
