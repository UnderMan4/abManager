import { FC, useEffect } from "react";

import { RoundProgressBar } from "@/components/common";
import { createNullableContext } from "@/utils/componentUtils";

import { QueueItem, useImportQueue } from "../hooks/useImportQueue";
import { WindowButton } from "./WindowButton";

export type ImportContextValue = {
   importQueue: Map<string, QueueItem>;
};

const ImportContext = createNullableContext<ImportContextValue>(null);

export const ImportButton: FC = () => {
   const { importQueue, queueProgress, isImporting } = useImportQueue();

   useEffect(() => {
      const progress = queueProgress.progress / queueProgress.max;
      console.log("🚀 ~ useEffect ~ progress:", progress.toFixed(2));
   }, [queueProgress]);

   if (!isImporting) {
      return null;
   }

   return (
      <>
         <WindowButton>
            <RoundProgressBar
               icon="ph:upload-simple-bold"
               progressMax={queueProgress.max}
               progressValue={queueProgress.progress}
               className="size-7"
            />
         </WindowButton>
         <ImportContext.Provider
            value={{
               importQueue,
            }}
         ></ImportContext.Provider>
      </>
   );
};
