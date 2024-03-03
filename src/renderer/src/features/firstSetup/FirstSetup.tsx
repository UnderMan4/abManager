import { FC, useState } from "react";
import { useCounter } from "usehooks-ts";

import { SaveTypeCard } from "./components/cards/SaveTypeCard";
import { SelectDirectoryCard } from "./components/cards/SelectDirectoryCard";
import { WelcomeCard } from "./components/cards/WelcomeCard";

export const FirstSetup: FC = () => {
   const { count: currentStep, increment, decrement } = useCounter(0);

   const [isBack, setIsBack] = useState(false);

   const [selectedDirectory, setSelectedDirectory] = useState<string>();

   const nextStep = () => {
      increment();
   };

   const previousStep = () => {
      decrement();
   };

   const navigation = {
      currentStep,
      previousStep,
      nextStep,
      setIsBack,
      isBack,
   };
   return (
      <div className="min-h-screen relative">
         <WelcomeCard cardNavigation={navigation} />
         <SelectDirectoryCard
            cardNavigation={navigation}
            setSelectedDirectory={setSelectedDirectory}
            selectedDirectory={selectedDirectory}
         />
         <SaveTypeCard cardNavigation={navigation} />
      </div>
   );
};
