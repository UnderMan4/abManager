import { constants } from "buffer";
import { AnimatePresence, m } from "framer-motion";
import { Dispatch, FC, SetStateAction, useLayoutEffect } from "react";
import { z } from "zod";

import { AbsoluteCenter, Card } from "@/components/common";
import { LIBRARY_DIRECTORY_NAME, pathRegex } from "@/constants";
import { FolderSelector } from "@/features/firstSetup/FolderSelector";
import { useAppForm } from "@/hooks";

import { variants } from "./variants";

export type SelectDirectoryCardProps = {
   count: number;
   previousStep: () => void;
   nextStep: () => void;
   setIsBack: Dispatch<SetStateAction<boolean>>;
   isBack: boolean;
   selectedDirectory: string | undefined;
   setSelectedDirectory: Dispatch<SetStateAction<string | undefined>>;
};

export const SelectDirectoryCard: FC<SelectDirectoryCardProps> = ({
   count,
   nextStep,
   previousStep,
   setIsBack,
   isBack,
   selectedDirectory,
   setSelectedDirectory,
}) => {
   const form = useAppForm(
      z.object({ path: z.string().min(1).regex(pathRegex) })
   );
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
                     leftButton={{
                        onMouseEnter: () => setIsBack(true),
                        onFocusCapture: () => setIsBack(true),
                        onClick: previousStep,
                        appearance: "outlineGray",
                        label: "Back",
                        icon: {
                           name: "ph:arrow-left-bold",
                           hoverAnimation: "moveLeft",
                           position: "left",
                        },
                     }}
                     rightButton={{
                        onClick: nextStep,
                        onMouseEnter: () => setIsBack(false),
                        onFocusCapture: () => setIsBack(false),
                        icon: {
                           name: "ph:arrow-right-bold",
                           hoverAnimation: "moveRight",
                           position: "right",
                        },
                        appearance: "solid",
                        label: "Next",
                     }}
                  >
                     <FolderSelector
                        className="w-96"
                        value={selectedDirectory}
                        onChange={(value) => {
                           console.log(value.path);
                           const lastDirectory = window.path.parse(
                              value.path
                           ).base;
                           console.log(lastDirectory);

                           if (!lastDirectory) return;

                           if (lastDirectory === LIBRARY_DIRECTORY_NAME) {
                              setSelectedDirectory(value.path);
                              return;
                           }

                           setSelectedDirectory(
                              window.path.join(
                                 value.path,
                                 LIBRARY_DIRECTORY_NAME
                              )
                           );
                        }}
                     />
                  </Card>
               </m.div>
            )}
         </AnimatePresence>
      </AbsoluteCenter>
   );
};
