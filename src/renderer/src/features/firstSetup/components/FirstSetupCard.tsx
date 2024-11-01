import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { AnimatePresence, Variants, motion } from "framer-motion";
import React, { FC, RefObject } from "react";

import { AbsoluteCenter, Card } from "@/components/common";
import { useFirstSetupContext } from "@/hooks/contexts/useFirstSetupContext";
import { cls } from "@/utils/styleUtils";

export type FirstSetupCardProps = {
   cardNumber: number;
   children?: React.ReactNode;
   title: string;
   backButtonLabel?: string;
   nextButtonLabel?: string;
   nextButtonActive?: boolean;
   cardClassName?: string;
   contentRef?: RefObject<HTMLDivElement>;
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
   contentRef,
}) => {
   const {
      navigation: { nextStep, previousStep, setIsBack, isBack, currentStep },
   } = useFirstSetupContext();

   return (
      <AbsoluteCenter className="max-w-lg">
         <AnimatePresence>
            {currentStep === cardNumber && (
               <motion.div
                  variants={variants}
                  initial={isBack ? "initialBack" : "initial"}
                  animate="animate"
                  exit={isBack ? "exitBack" : "exit"}
               >
                  <Card
                     className={cls(cardClassName, "no-drag min-w-96")}
                     title={title}
                     contentRef={contentRef}
                     leftButton={
                        backButtonLabel
                           ? {
                                onMouseEnter: () => setIsBack(true),
                                onFocusCapture: () => setIsBack(true),
                                onClick: previousStep,
                                variant: "outline",
                                label: backButtonLabel,
                                icon: <ArrowLeft weight="bold" />,
                                iconPosition: "left",
                             }
                           : undefined
                     }
                     rightButton={
                        nextButtonLabel
                           ? {
                                onClick: nextStep,
                                onMouseEnter: () => setIsBack(false),
                                onFocusCapture: () => setIsBack(false),

                                label: nextButtonLabel,
                                disabled: !nextButtonActive,
                                icon: <ArrowRight weight="bold" />,
                                iconPosition: "right",
                             }
                           : undefined
                     }
                  >
                     {children}
                  </Card>
               </motion.div>
            )}
         </AnimatePresence>
      </AbsoluteCenter>
   );
};
