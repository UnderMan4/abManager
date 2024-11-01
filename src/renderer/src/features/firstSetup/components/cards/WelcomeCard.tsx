import { ArrowRight } from "@phosphor-icons/react";
import { FC } from "react";

import { Button } from "@/components/ui";
import { FirstSetupCard } from "@/features/firstSetup/components/FirstSetupCard";
import { useFirstSetupContext } from "@/hooks/contexts/useFirstSetupContext";

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
         >
            Get started
            <ArrowRight weight="bold" />
         </Button>
      </FirstSetupCard>
   );
};
