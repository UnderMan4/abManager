import { useCallback, useState } from "react";
import { useIntl } from "react-intl";

import { AUDIO_FILES_EXTENSIONS } from "@/constants";
import { FileData, LoadStatus } from "@/features/importNew";
import { generateUniqueId } from "@/utils/stringUtils";
import { prepareToast } from "@/utils/toastUtils";

export const useImportFiles = () => {
   const { formatMessage } = useIntl();
   const [status, setStatus] = useState<LoadStatus>("idle");

   const [isDialogOpen, setIsDialogOpen] = useState(false);

   const [canOpenDialog, setCanOpenSystemDialog] = useState(true);
   const [selectedFiles, setSelectedFiles] = useState<FileData[]>([]);
   const [failedPaths, setFailedPaths] = useState<string[]>([]);
   const [numberOfSelectedFiles, setNumberOfSelectedFiles] = useState(0);

   const selectFiles = useCallback(async () => {
      if (!canOpenDialog) return;

      setCanOpenSystemDialog(false);
      setIsDialogOpen(true);
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
         setCanOpenSystemDialog(true);
         setIsDialogOpen(false);
         setStatus("idle");
         return;
      }
      setNumberOfSelectedFiles(filePaths.length);
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
      setCanOpenSystemDialog,
      canOpenDialog,
      formatMessage,
   ]);

   return {
      selectedFiles,
      selectFiles,
      failedPaths,
      isDialogOpen,
      setIsDialogOpen,
      status,
      numberOfSelectedFiles,
   };
};
