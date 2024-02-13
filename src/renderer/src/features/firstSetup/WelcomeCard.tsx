import { AnimatePresence, m } from "framer-motion";
import { FC } from "react";

import { AbsoluteCenter, Button, Card } from "@/components/common";

import { variants } from "./variants";

export type WelcomeCardProps = {
   nextStep: () => void;
   count: number;
};

export const WelcomeCard: FC<WelcomeCardProps> = ({ count, nextStep }) => {
   return (
      <AbsoluteCenter className="max-w-lg">
         <AnimatePresence>
            {count === 0 && (
               <m.div
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
               >
                  <Card
                     contentClassName="flex flex-col gap-2 items-center"
                     title="Welcome to audiobook manager"
                  >
                     <Button
                        icon="ph:arrow-right-bold"
                        appearance="solid"
                        iconPosition="right"
                        className="group"
                        iconClassName="group-hover:group-enabled:translate-x-1 transition-transform duration-300 ease-in-out"
                        onClick={nextStep}
                     >
                        Start
                     </Button>
                  </Card>
               </m.div>
            )}
         </AnimatePresence>
      </AbsoluteCenter>
   );
};
