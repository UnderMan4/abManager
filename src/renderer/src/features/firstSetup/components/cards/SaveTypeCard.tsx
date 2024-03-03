import { FC } from "react";

import { RadioGroup } from "@/components/common/RadioGroup";
import { RadioButton } from "@/components/common/RadioGroup/RadioButton";
import { FirstSetupCard } from "@/features/firstSetup/components/FirstSetupCard";
import { CardNavigation } from "@/features/firstSetup/types";

export type SaveTypeCardProps = {
   cardNavigation: CardNavigation;
};

export const SaveTypeCard: FC<SaveTypeCardProps> = ({ cardNavigation }) => {
   return (
      <FirstSetupCard
         cardNavigation={cardNavigation}
         isVisible={cardNavigation.currentStep === 2}
         backButtonLabel="Back"
         nextButtonLabel="Finish"
         title="Select save type"
         nextButtonActive={true}
      >
         <RadioGroup className="flex flex-col gap-5" defaultValue="copy">
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
