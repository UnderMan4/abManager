import { FC, useState } from "react";
import { useCounter } from "usehooks-ts";

import { SelectDirectoryCard } from "./SelectDirectoryCard";
import { WelcomeCard } from "./WelcomeCard";

export const FirstSetup: FC = () => {
   const { count, increment, decrement } = useCounter(0);

   const [isBack, setIsBack] = useState(false);

   const [selectedDirectory, setSelectedDirectory] = useState<string>();

   const nextStep = () => {
      setIsBack(false);
      increment();
   };

   const previousStep = () => {
      setIsBack(true);
      decrement();
   };
   return (
      <div className="min-h-screen relative">
         <WelcomeCard count={count} nextStep={nextStep} />
         <SelectDirectoryCard
            count={count}
            nextStep={nextStep}
            previousStep={previousStep}
            isBack={isBack}
            setSelectedDirectory={setSelectedDirectory}
         />
      </div>
   );
};
