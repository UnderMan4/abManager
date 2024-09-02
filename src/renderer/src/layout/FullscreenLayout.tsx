import { AnimatePresence, Variants, motion } from "framer-motion";
import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { Outlet, useLocation } from "react-router-dom";

import { Heading } from "@/components/common";
import { IconButton } from "@/components/forms";
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

   const { navigateToHome, stepsToHome } = useHistory();

   return (
      <div className="flex flex-col h-screen bg-radix-gray-200">
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
                  onClick={navigateToHome}
                  className="z-10"
               />
            </div>
         </header>
         <div className="grow shrink row-start-2 row-end-3 h-[calc(100%-var(--fullscreen-header-height)-var(--titlebar-height))]">
            <Outlet />
         </div>
      </div>
   );
};
