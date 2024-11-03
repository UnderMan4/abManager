import { Stats } from "fs";
import { IAudioMetadata } from "music-metadata";
import { FC, useCallback, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import useAsyncEffect from "use-async-effect";

import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui";
import { AUDIO_FILES_EXTENSIONS } from "@/constants";
import { generateUniqueId } from "@/utils/stringUtils";
import { prepareToast } from "@/utils/toastUtils";

export type LoadStatus =
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

export const ImportNewFile: FC = () => {
   const { formatMessage } = useIntl();
   const [status, setStatus] = useState<LoadStatus>("selectingFiles");

   const [canOpenDialog, setCanOpenDialog] = useState(true);
   const [selectedFiles, setSelectedFiles] = useState<FileData[]>([]);
   const [failedPaths, setFailedPaths] = useState<string[]>([]);

   const selectFiles = useCallback(async () => {
      if (!canOpenDialog) return;

      setCanOpenDialog(false);

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

      if (canceled || filePaths.length === 0) return;
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
      } catch (error) {
         prepareToast.error({
            title: formatMessage({ id: "toasts.importFileRead.title" }),
            description: formatMessage({
               id: "toasts.error.importFileRead.description",
            }),
            id: `importFileRead-${generateUniqueId(filePaths)}`,
         });
         console.error(error);
      }
   }, []);

   useAsyncEffect(async () => {
      if (selectedFiles.length !== 0) return;
   }, [selectedFiles]);
   return (
      <>
         <DialogHeader>
            <DialogTitle>
               <FormattedMessage id="importNew.pages.importFiles" />
            </DialogTitle>
            <DialogDescription>new file</DialogDescription>
         </DialogHeader>
         <div className="overflow-x-auto"></div>
      </>
   );
};
