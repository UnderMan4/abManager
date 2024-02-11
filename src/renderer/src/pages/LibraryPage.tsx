import { AnimatePresence, motion } from "framer-motion";
import { FC, useState } from "react";

import { Button, Card } from "@/components/common";
import { useSettingsStore } from "@/stores";

export type LibraryPageProps = {
   className?: string;
};

export const LibraryPage: FC<LibraryPageProps> = ({ className }) => {
   const { libraryPath } = useSettingsStore();

   const [isSelectDirectoryVisible, setIsSelectDirectoryVisible] =
      useState(false);

   return libraryPath ? (
      <div className="h-full w-full flex items-center justify-center"></div>
   ) : (
      <div className="flex  justify-center overflow-hidden">
         <motion.div
            layout
            className="min-h-screen w-full flex items-strech justify-center flex-col gap-3 max-w-fit overflow-hidden"
         >
            <AnimatePresence mode="wait">
               <motion.div layout>
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
                        onClick={() =>
                           setIsSelectDirectoryVisible((value) => !value)
                        }
                     >
                        Let's begin
                     </Button>
                  </Card>
               </motion.div>
               {isSelectDirectoryVisible && (
                  <motion.div initial={{ y: 1000 }} animate={{ y: 0 }} layout>
                     <Card
                        contentClassName="flex flex-col gap-2 items-center"
                        title="Select path to your library"
                     ></Card>
                  </motion.div>
               )}
            </AnimatePresence>
         </motion.div>
      </div>
   );
};
