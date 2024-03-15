import { AnimatePresence, Variants, m } from "framer-motion";
import React, { FC } from "react";

import { AbsoluteCenter, Card } from "@/components/common";
import { useFirstSetupContext } from "@/features/firstSetup/components/FirstSetupContext";

export type FirstSetupCardProps = {
   cardNumber: number;
   children?: React.ReactNode;
   title: string;
   backButtonLabel?: string;
   nextButtonLabel?: string;
   nextButtonActive?: boolean;
   cardClassName?: string;
};

const variants: Variants = {
   initial: {
      y: 75,
      opacity: 0,
      scale: 0.75,
   },
   initialBack: {
      y: -75,
      opacity: 0,
      scale: 0.75,
   },
   animate: {
      y: 0,
      opacity: 1,
      transitionTimingFunction: "ease-out",
      transition: {
         delay: 0.1,
      },
      scale: 1,
   },
   exit: {
      y: -75,
      opacity: 0,
      transitionTimingFunction: "ease-out",
      scale: 0.75,
   },
   exitBack: {
      y: 75,
      opacity: 0,
      transitionTimingFunction: "ease-out",
      scale: 0.75,
   },
};

export const FirstSetupCard: FC<FirstSetupCardProps> = ({
   children,
   title,
   backButtonLabel,
   nextButtonLabel,
   cardClassName,
   cardNumber,
   nextButtonActive,
}) => {
   const {
      navigation: { nextStep, previousStep, setIsBack, isBack, currentStep },
   } = useFirstSetupContext();

   return (
      <AbsoluteCenter className="max-w-lg">
         <AnimatePresence>
            {currentStep === cardNumber && (
               <m.div
                  variants={variants}
                  initial={isBack ? "initialBack" : "initial"}
                  animate="animate"
                  exit={isBack ? "exitBack" : "exit"}
               >
                  <Card
                     className={cardClassName}
                     title={title}
                     leftButton={
                        backButtonLabel
                           ? {
                                onMouseEnter: () => setIsBack(true),
                                onFocusCapture: () => setIsBack(true),
                                onClick: previousStep,
                                appearance: "outlineGray",
                                label: backButtonLabel,
                                icon: {
                                   name: "ph:arrow-left-bold",
                                   hoverAnimation: "moveLeft",
                                   position: "left",
                                },
                             }
                           : undefined
                     }
                     rightButton={
                        nextButtonLabel
                           ? {
                                onClick: nextStep,
                                onMouseEnter: () => setIsBack(false),
                                onFocusCapture: () => setIsBack(false),
                                appearance: "solid",
                                label: nextButtonLabel,
                                icon: {
                                   name: "ph:arrow-right-bold",
                                   hoverAnimation: "moveRight",
                                   position: "right",
                                },
                                disabled: !nextButtonActive,
                             }
                           : undefined
                     }
                  >
                     {children}
                  </Card>
               </m.div>
            )}
         </AnimatePresence>
      </AbsoluteCenter>
   );
};
