import { FC } from "react";

import { FirstSetupCard } from "@/features/firstSetup/FirstSetupCard";
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
      >
         <div></div>
      </FirstSetupCard>
   );
};
