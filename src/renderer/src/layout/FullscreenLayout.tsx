import { AnimatePresence, Variants, m } from "framer-motion";
import { FC, useMemo } from "react";
import { Outlet } from "react-router-dom";

import { IconButton } from "@/components/forms";
import { HOME_PATHS } from "@/constants";
import { useAppNavigate, useHistory } from "@/hooks";

const backButtonVariants: Variants = {
   hidden: { x: 0 },
   visible: { x: -48 },
   exit: {
      x: 0,
      transition: {
         duration: 0.13,
         ease: "easeInOut",
      },
   },
};
export const FullscreenLayout: FC = () => {
   const navigate = useAppNavigate();

   const history = useHistory();

   const stepsToHome = useMemo(() => {
      const historyLength = history.length;
      for (let i = historyLength - 1; i >= 0; i--) {
         if (HOME_PATHS.includes(history[i]!)) {
            return historyLength - 1 - i;
         }
      }
      return -1; // Indicating no home path found
   }, [history]);

   const handleNavigate = () => {
      if (stepsToHome <= 0) {
         navigate("/");
      } else {
         navigate(-stepsToHome);
      }
   };

   return (
      <div className="h-screen max-h-screen w-screen flex flex-col">
         <div className="p-3 flex shrink-0 justify-end gap-2">
            <div className="flex relative">
               <AnimatePresence>
                  {stepsToHome > 1 && (
                     <m.div
                        className="flex absolute"
                        variants={backButtonVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                     >
                        <IconButton
                           appearance="outlineGray"
                           icon="ph:arrow-left-bold"
                           onClick={() => navigate(-1)}
                        />
                     </m.div>
                  )}
               </AnimatePresence>
               <IconButton
                  icon="ph:x-bold"
                  onClick={handleNavigate}
                  className="z-10"
               />
            </div>
         </div>
         <div className="grow overflow-auto">
            <Outlet />
         </div>
      </div>
   );
};
