import { FC } from "react";

import { Button } from "@/components/common";
import { FirstSetupCard } from "@/features/firstSetup/FirstSetupCard";
import { CardNavigation } from "@/features/firstSetup/types";

export type WelcomeCardProps = {
   cardNavigation: CardNavigation;
};

export const WelcomeCard: FC<WelcomeCardProps> = ({ cardNavigation }) => {
   return (
      <FirstSetupCard
         cardNavigation={cardNavigation}
         isVisible={cardNavigation.currentStep === 0}
         title="Welcome to audiobook manager"
         cardClassName="flex flex-col items-center justify-end"
      >
         <Button
            onClick={cardNavigation.nextStep}
            onMouseEnter={() => cardNavigation.setIsBack(false)}
            onFocusCapture={() => cardNavigation.setIsBack(false)}
            icon={{
               name: "ph:arrow-right-bold",
               hoverAnimation: "moveRight",
               position: "right",
            }}
         >
            Get started
         </Button>
      </FirstSetupCard>
   );
};
