import { FC } from "react";

import { FirstSetupProvider } from "@/features/firstSetup/components/FirstSetupContext";
import {
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
         </FirstSetupProvider>
      </div>
   );
};
