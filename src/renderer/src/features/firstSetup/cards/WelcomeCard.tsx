import { AnimatePresence, m } from "framer-motion";
import { FC } from "react";

import { AbsoluteCenter, Button, Card } from "@/components/common";

import { variants } from "./variants";

export type WelcomeCardProps = {
   nextStep: () => void;
   count: number;
   setIsBack: (isBack: boolean) => void;
   isBack: boolean;
};

export const WelcomeCard: FC<WelcomeCardProps> = ({
   count,
   nextStep,
   setIsBack,
   isBack,
}) => {
   return (
      <AbsoluteCenter className="max-w-lg">
         <AnimatePresence>
            {count === 0 && (
               <m.div
                  variants={variants}
                  initial={isBack ? "initialBack" : "initial"}
                  animate="animate"
                  exit="exit"
               >
                  <Card
                     contentClassName="flex flex-col items-center justify-end"
                     title="Welcome to audiobook manager"
                  >
                     <Button
                        onClick={nextStep}
                        onMouseEnter={() => setIsBack(false)}
                        onFocusCapture={() => setIsBack(false)}
                        icon={{
                           name: "ph:arrow-right-bold",
                           hoverAnimation: "moveRight",
                           position: "right",
                        }}
                     >
                        Get started
                     </Button>
                  </Card>
               </m.div>
            )}
         </AnimatePresence>
      </AbsoluteCenter>
   );
};
