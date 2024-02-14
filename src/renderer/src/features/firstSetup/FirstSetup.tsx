import { FC, useState } from "react";
import { useCounter } from "usehooks-ts";

import { SelectDirectoryCard } from "./cards/SelectDirectoryCard";
import { WelcomeCard } from "./cards/WelcomeCard";

export const FirstSetup: FC = () => {
   const { count, increment, decrement } = useCounter(0);

   const [isBack, setIsBack] = useState(false);

   const [selectedDirectory, setSelectedDirectory] = useState<string>();

   const nextStep = () => {
      increment();
   };

   const previousStep = () => {
      decrement();
   };
   return (
      <div className="min-h-screen relative">
         <WelcomeCard
            count={count}
            nextStep={nextStep}
            setIsBack={setIsBack}
            isBack={isBack}
         />
         <SelectDirectoryCard
            count={count}
            nextStep={nextStep}
            previousStep={previousStep}
            isBack={isBack}
            setIsBack={setIsBack}
            setSelectedDirectory={setSelectedDirectory}
            selectedDirectory={selectedDirectory}
         />
      </div>
   );
};
