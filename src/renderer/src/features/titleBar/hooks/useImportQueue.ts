import { useCallback, useEffect, useMemo, useState } from "react";

export type CurrentFile = {
   fileName: string;
   fileNo: number;
   fileSize: number;
   progress: number;
   status: "starting" | "importing" | "finalizing" | "done";
};
export type QueueItem = {
   currentFile: CurrentFile | null;
   status: "starting" | "importing" | "finalizing" | "done" | "error";
   totalFiles: number;
   totalSize: number;
   progress: number;
   outcome: {
      success: number;
      errors: number;
      warnings: number;
   };
};

export type QueueProgress = {
   progress: number;
   max: number;
};

export const useImportQueue = () => {
   const [importQueue, setImportQueue] = useState<Map<string, QueueItem>>(
      new Map()
   );

   const queueProgress = useMemo(() => {
      const progress: QueueProgress = {
         progress: 0,
         max: 0,
      };
      for (const item of importQueue.values()) {
         progress.progress += item.progress;
         progress.max += item.totalSize;
      }
      return progress;
   }, [importQueue]);

   const isImporting = useMemo(() => {
      return Array.from(importQueue.values()).some(
         (item) => item.status === "importing"
      );
   }, [importQueue]);

   const onStarting = useCallback(
      (data: ImportListenerData<"starting">) => {
         setImportQueue((prevQueue) => {
            const newQueue = new Map(prevQueue);
            newQueue.set(data.id, {
               currentFile: null,
               status: "starting",
               progress: 0,
               totalFiles: data.totalFiles,
               totalSize: data.totalSize,
               outcome: {
                  success: 0,
                  errors: 0,
                  warnings: 0,
               },
            });
            return newQueue;
         });
      },
      [setImportQueue]
   );

   const onStartingFile = useCallback(
      (data: ImportListenerData<"startingFile">) => {
         setImportQueue((prevQueue) => {
            const newQueue = new Map(prevQueue);
            const item = newQueue.get(data.id);
            if (item) {
               item.currentFile = {
                  fileName: data.fileName,
                  fileNo: data.fileNo,
                  fileSize: data.fileSize,
                  progress: 0,
                  status: "starting",
               };
               item.status = "importing";
            }
            return newQueue;
         });
      },
      [setImportQueue]
   );

   const onCopying = useCallback(
      (data: ImportListenerData<"copying">) => {
         setImportQueue((prevQueue) => {
            const newQueue = new Map(prevQueue);
            const item = newQueue.get(data.id);
            if (item) {
               item.currentFile = {
                  ...item.currentFile!,
                  progress: item.currentFile!.progress + data.chunkLength,
                  status: "importing",
               };
               item.progress = item.progress + data.chunkLength;
            }
            return newQueue;
         });
      },
      [setImportQueue]
   );

   const onFinalizingFile = useCallback(
      (data: ImportListenerData<"finalizingFile">) => {
         setImportQueue((prevQueue) => {
            const newQueue = new Map(prevQueue);
            const item = newQueue.get(data.id);
            if (item) {
               item.currentFile = {
                  ...item.currentFile!,
                  status: "finalizing",
               };
            }
            return newQueue;
         });
      },
      [setImportQueue]
   );

   const onDoneFile = useCallback(
      (data: ImportListenerData<"doneFile">) => {
         setImportQueue((prevQueue) => {
            const newQueue = new Map(prevQueue);
            const item = newQueue.get(data.id);
            if (item) {
               item.currentFile = {
                  ...item.currentFile!,
                  status: "done",
               };
               item.outcome.success++;
            }
            return newQueue;
         });
      },
      [setImportQueue]
   );

   const onDone = useCallback(
      (data: ImportListenerData<"done">) => {
         setImportQueue((prevQueue) => {
            const newQueue = new Map(prevQueue);
            const item = newQueue.get(data.id);
            if (item) {
               item.status = "done";
               item.progress = item.totalSize;
            }
            return newQueue;
         });
      },
      [setImportQueue]
   );

   const onFileError = useCallback(
      (data: ImportListenerData<"fileError">) => {
         setImportQueue((prevQueue) => {
            const newQueue = new Map(prevQueue);
            const item = newQueue.get(data.id);
            if (item) {
               item.outcome.errors++;
            }
            return newQueue;
         });
      },
      [setImportQueue]
   );

   const onDeleteError = useCallback(
      (data: ImportListenerData<"deleteError">) => {
         setImportQueue((prevQueue) => {
            const newQueue = new Map(prevQueue);
            const item = newQueue.get(data.id);
            if (item) {
               item.outcome.warnings++;
            }
            return newQueue;
         });
      },
      [setImportQueue]
   );

   const removeItem = useCallback(
      (id: string) => {
         setImportQueue((prevQueue) => {
            const newQueue = new Map(prevQueue);

            const itemToRemove = newQueue.get(id);
            if (
               itemToRemove &&
               ["done", "error"].includes(itemToRemove.status)
            ) {
               newQueue.delete(id);
            }
            return newQueue;
         });
      },
      [setImportQueue]
   );

   const handleMessage = useCallback(
      (_, data: ImportListenerData) => {
         switch (data.status) {
            case "starting":
               onStarting(data);
               break;
            case "startingFile":
               onStartingFile(data);
               break;
            case "copying":
               onCopying(data);
               break;
            case "finalizingFile":
               onFinalizingFile(data);
               break;
            case "doneFile":
               onDoneFile(data);
               break;
            case "done":
               onDone(data);
               break;
            case "fileError":
               onFileError(data);
               break;
            case "deleteError":
               onDeleteError(data);
               break;
         }
      },
      [
         onStarting,
         onStartingFile,
         onCopying,
         onFinalizingFile,
         onDoneFile,
         onDone,
         onFileError,
         onDeleteError,
      ]
   );

   useEffect(() => {
      const unsubscribe = window.api.import.onMessage(handleMessage);
      return () => {
         unsubscribe();
      };
   }, [handleMessage]);

   return {
      importQueue,
      queueProgress,
      removeItem,
      isImporting,
   };
};
