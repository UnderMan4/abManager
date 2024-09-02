import { Icon } from "@iconify/react";
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
      <div className="min-h-screen relative window-drag">
         <button
            className="absolute right-4 top-4 hover:text-radix-gray-1100 transition-colors"
            onClick={window.mainWindow.close}
         >
            <Icon icon="ph:x-bold" height="1.5rem" />
         </button>
         <FirstSetupProvider>
            <WelcomeCard />
            <SelectDirectoryCard />
            <SaveTypeCard />
            <FinishCard />
         </FirstSetupProvider>
      </div>
   );
};
