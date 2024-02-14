import { Variants } from "framer-motion";

export const variants: Variants = {
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
