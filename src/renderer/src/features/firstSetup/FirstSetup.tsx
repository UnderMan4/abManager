import { FC } from "react";

import { FirstSetupProvider } from "@/features/firstSetup/components/FirstSetupContext";
import {
   FinishCard,
   SaveTypeCard,
   SelectDirectoryCard,
   WelcomeCard,
} from "@/features/firstSetup/components/cards";

export const FirstSetup: FC = () => {
   return (
      <div className="min-h-screen relative">
         <FirstSetupProvider>
            <WelcomeCard />
            <SelectDirectoryCard />
            <SaveTypeCard />
            <FinishCard />
         </FirstSetupProvider>
      </div>
   );
};
