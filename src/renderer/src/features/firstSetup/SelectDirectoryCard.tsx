import { AnimatePresence, m } from "framer-motion";
import { Dispatch, FC, SetStateAction } from "react";

import { AbsoluteCenter, Button, Card } from "@/components/common";

import { variants } from "./variants";

export type SelectDirectoryCardProps = {
   count: number;
   isBack: boolean;
   previousStep: () => void;
   nextStep: () => void;
   setSelectedDirectory: Dispatch<SetStateAction<string | undefined>>;
};

export const SelectDirectoryCard: FC<SelectDirectoryCardProps> = ({
   count,
   isBack,
   nextStep,
   previousStep,
   setSelectedDirectory,
}) => {
   return (
      <AbsoluteCenter className="max-w-lg">
         <AnimatePresence>
            {count === 1 && (
               <m.div
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit={isBack ? "exitBack" : "exit"}
               >
                  <Card
                     contentClassName="flex flex-col gap-2"
                     title="Select path to your library"
                  >
                     <div className="flex flex-row justify-between ">
                        <Button
                           onClick={previousStep}
                           icon="ph:arrow-left-bold"
                           appearance="outlineGray"
                           iconClassName="group-hover:group-enabled:-translate-x-1 transition-transform duration-300 ease-in-out"
                        >
                           Go back
                        </Button>
                        <Button
                           onClick={nextStep}
                           iconPosition="right"
                           icon="ph:arrow-right-bold"
                           iconClassName="group-hover:group-enabled:translate-x-1 transition-transform duration-300 ease-in-out"
                        >
                           Next
                        </Button>
                     </div>
                  </Card>
               </m.div>
            )}
         </AnimatePresence>
      </AbsoluteCenter>
   );
};
