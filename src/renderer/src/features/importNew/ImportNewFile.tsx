import { Stats } from "fs";
import { IAudioMetadata } from "music-metadata";
import { FC, useCallback, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import {
   Alert,
   AlertDescription,
   Button,
   DialogHeader,
   DialogTitle,
} from "@/components/ui";
import { AUDIO_FILES_EXTENSIONS } from "@/constants";
import { generateUniqueId } from "@/utils/stringUtils";
import { prepareToast } from "@/utils/toastUtils";

import { AudiobookElement, AudiobookSkeleton } from "./components";

export type LoadStatus =
   | "idle"
   | "selectingFiles"
   | "processingPaths"
   | "done"
   | "error";

export type FileData = {
   path: string;
   stats: Stats;
   audioMetadata: IAudioMetadata;
   isSelected: boolean;
};

export type ImportNewFileProps = {
   setIsFilesSelected: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ImportNewFile: FC<ImportNewFileProps> = ({
   setIsFilesSelected,
}) => {
   const { formatMessage } = useIntl();
   const [status, setStatus] = useState<LoadStatus>("idle");

   const [canOpenDialog, setCanOpenDialog] = useState(true);
   const [selectedFiles, setSelectedFiles] = useState<FileData[]>([]);
   const [failedPaths, setFailedPaths] = useState<string[]>([]);
   const [numberOfSelectedFiles, setNumberOfSelectedFiles] = useState(0);

   const selectFiles = useCallback(async () => {
      if (!canOpenDialog) return;

      setCanOpenDialog(false);
      setStatus("selectingFiles");

      const { filePaths, canceled } = await window.api.showOpenDialog({
         properties: ["multiSelections", "openFile"],
         title: formatMessage({ id: "importNew.selectFilesWindow.title" }),
         buttonLabel: formatMessage({
            id: "importNew.selectFilesWindow.button",
         }),
         filters: [
            {
               name: formatMessage({
                  id: "importNew.selectFilesWindow.filterName",
               }),
               extensions: AUDIO_FILES_EXTENSIONS,
            },
         ],
      });

      if (canceled || filePaths.length === 0) {
         setCanOpenDialog(true);
         setStatus("idle");
         return;
      }
      setNumberOfSelectedFiles(filePaths.length);
      setIsFilesSelected(true);
      setStatus("processingPaths");

      const promises = filePaths.map(async (path) => {
         const metadata = await window.fs.readFileMetadata(path);
         if ("error" in metadata) {
            setFailedPaths((prev) => [...prev, path]);
            return;
         }

         return {
            ...metadata,
            path,
            isSelected: true,
         };
      });

      try {
         const results: FileData[] = (await Promise.all(promises)).filter(
            (result) => result !== undefined
         );
         setSelectedFiles(results);
         setStatus("done");
      } catch (error) {
         prepareToast.error({
            title: formatMessage({ id: "toasts.error.importFileRead.title" }),
            description: formatMessage({
               id: "toasts.error.importFileRead.description",
            }),
            id: `importFileRead-${generateUniqueId(filePaths)}`,
         });
         setStatus("error");
         console.error(error);
      }
   }, [
      setSelectedFiles,
      setFailedPaths,
      setCanOpenDialog,
      canOpenDialog,
      formatMessage,
      setIsFilesSelected,
   ]);

   return (
      <>
         <DialogHeader>
            <DialogTitle>
               <FormattedMessage id="importNew.pages.importFiles" />
            </DialogTitle>
         </DialogHeader>
         <div className="overflow-x-auto flex flex-col gap-3">
            {selectedFiles.length === 0 && status === "idle" && (
               <Button
                  variant="outline"
                  className="h-24 text-xl"
                  onClick={selectFiles}
               >
                  <FormattedMessage id="importNew.selectFilesBtn" />
               </Button>
            )}
            {status === "selectingFiles" && (
               <Alert>
                  <AlertDescription>
                     <FormattedMessage id="importNew.selectFilesMessage" />
                  </AlertDescription>
               </Alert>
            )}
            {status === "processingPaths" &&
               Array.from({ length: numberOfSelectedFiles }).map((_, index) => (
                  <AudiobookSkeleton key={index} />
               ))}
            {status === "done" &&
               selectedFiles.map((file) => (
                  <AudiobookElement data={file} key={file.path} />
               ))}
         </div>
      </>
   );
};
