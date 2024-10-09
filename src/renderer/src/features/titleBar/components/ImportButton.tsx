/* eslint-disable @typescript-eslint/no-unused-vars */
import { BoxArrowDown, DownloadSimple } from "@phosphor-icons/react";
import * as Popover from "@radix-ui/react-popover";
import { AnimatePresence } from "framer-motion";
import { FC } from "react";

import { ProgressBar, RoundProgressBar } from "@/components/common";
import { createNullableContext } from "@/utils/componentUtils";

import { QueueItem, useImportQueue } from "../hooks/useImportQueue";

export type ImportContextValue = {
   importQueue: Map<string, QueueItem>;
};

const ImportContext = createNullableContext<ImportContextValue>(null);

export const ImportButton: FC = () => {
   const { importQueue, queueProgress, isImporting } = useImportQueue();

   return (
      <Popover.Root>
         <Popover.Trigger asChild>
            <button>
               <RoundProgressBar
                  progressMax={queueProgress.max}
                  progressValue={queueProgress.progress}
                  icon={
                     <BoxArrowDown
                        size={18}
                        className="text-radix-gray-1200"
                        weight="bold"
                     />
                  }
               />
            </button>
         </Popover.Trigger>
         <Popover.Portal>
            <Popover.Content sideOffset={10}>
               <div className="bg-radix-gray-500 p-2 rounded-lg border border-radix-gray-700 w-44">
                  {Array.from(importQueue).map(([id, item]) => {
                     return (
                        <AnimatePresence key={id}>
                           {item && (
                              <ProgressBar
                                 key={id}
                                 className="mb-2"
                                 max={item.totalSize}
                                 value={item.progress}
                              />
                           )}
                        </AnimatePresence>
                     );
                  })}
               </div>
            </Popover.Content>
         </Popover.Portal>
      </Popover.Root>
   );
};
