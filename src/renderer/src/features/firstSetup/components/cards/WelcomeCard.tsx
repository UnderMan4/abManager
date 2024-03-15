import { FC } from "react";

import { Button } from "@/components/common";
import { FirstSetupCard } from "@/features/firstSetup/components/FirstSetupCard";
import { useFirstSetupContext } from "@/features/firstSetup/components/FirstSetupContext";

export const WelcomeCard: FC = () => {
   const { navigation } = useFirstSetupContext();
   return (
      <FirstSetupCard
         cardNumber={0}
         title="Welcome to audiobook manager"
         cardClassName="flex flex-col items-center justify-end"
      >
         <Button
            onClick={navigation.nextStep}
            onMouseEnter={() => navigation.setIsBack(false)}
            onFocusCapture={() => navigation.setIsBack(false)}
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
