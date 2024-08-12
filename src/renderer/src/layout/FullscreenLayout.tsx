import { AnimatePresence, Variants, motion } from "framer-motion";
import { FC, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { Outlet, useLocation } from "react-router-dom";

import { Heading } from "@/components/common";
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

const titles = {
   "/import-new/method": "importNew.pages.importMethod",
   "/import-new/file": "importNew.pages.importFiles",
   "/import-new/folder": "importNew.pages.importFolder",
};
export const FullscreenLayout: FC = () => {
   const navigate = useAppNavigate();

   const { pathname } = useLocation();

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
      <div className="flex flex-col h-screen">
         <header className="py-3 pl-5 pr-3 flex shrink-0 justify-between gap-2 row-start-1 row-end-2 h-[var(--fullscreen-header-height)]">
            <Heading as="h2" className="font-bold">
               <FormattedMessage id={titles[pathname] ?? ""} />
            </Heading>
            <div className="flex relative">
               <AnimatePresence>
                  {stepsToHome > 1 && (
                     <motion.div
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
                     </motion.div>
                  )}
               </AnimatePresence>
               <IconButton
                  icon="ph:x-bold"
                  onClick={handleNavigate}
                  className="z-10"
               />
            </div>
         </header>
         <div className="grow shrink row-start-2 row-end-3 h-[calc(100%-var(--fullscreen-header-height)]">
            <Outlet />
         </div>
      </div>
   );
};
