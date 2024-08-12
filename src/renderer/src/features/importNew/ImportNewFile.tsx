import { InlineIcon } from "@iconify/react";
import { Reorder } from "framer-motion";
import { Stats } from "fs";
import { IAudioMetadata } from "music-metadata";
import {
   Dispatch,
   FC,
   SetStateAction,
   createContext,
   useEffect,
   useState,
} from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useLocation } from "react-router-dom";

import { FullscreenLoader } from "@/components/common";
import { AudiobookDetails } from "@/features/importNew/components/AudiobookDetails";
import { FileImportElement } from "@/features/importNew/components/FileImportElement";
import { ImportNewFileOptions } from "@/features/importNew/components/ImportNewFileOptions";
import { SetObjectState, useObjectState } from "@/hooks";
import { generateUniqueId } from "@/utils/stringUtils";
import { cls } from "@/utils/styleUtils";
import { prepareToast } from "@/utils/toastUtils";

export type FileData = {
   path: string;
   stats: Stats;
   audioMetadata: IAudioMetadata;
   isSelected: boolean;
};

export type ImportNewFileOptions = {
   oneBook: boolean;
};

export type ImportNewFileContextState = {
   files: FileData[];
   setFiles: Dispatch<SetStateAction<FileData[]>>;
   selectedFile: FileData | null;
   setSelectedFile: Dispatch<SetStateAction<FileData | null>>;
   options: ImportNewFileOptions;
   setOptions: SetObjectState<ImportNewFileOptions>;
};

export const ImportNewFileContext =
   createContext<ImportNewFileContextState | null>(null);
export const ImportNewFile: FC = () => {
   const [isLoading, setIsLoading] = useState(true);
   const { state } = useLocation();

   const { formatMessage } = useIntl();

   const [files, setFiles] = useState<FileData[]>([]);
   const [options, setOptions] = useObjectState<ImportNewFileOptions>({
      oneBook: false,
   });

   const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
   useEffect(() => {
      const paths = state?.paths as string[];

      if (!paths) return;

      const promises = paths.map(async (path) => {
         const metadata = await window.fs.readFileMetadata(path);
         if ("error" in metadata) {
            console.error(metadata.error);
            return null;
         }
         return { ...metadata, path, isSelected: true };
      });

      Promise.all(promises)
         .then((results) => {
            const filteredResults = results.filter(
               (result) => result !== null
            ) as FileData[];
            setFiles(filteredResults);
         })
         .catch((error) => {
            prepareToast.error({
               title: formatMessage({ id: "toasts.importFileRead.title" }),
               description: formatMessage({
                  id: "toasts.error.importFileRead.description",
               }),
               id: `importFileRead-${generateUniqueId(paths)}`,
            });
            console.error(error);
         })
         .finally(() => {
            setIsLoading(false);
         });
   }, [state]);

   if (isLoading) {
      return (
         <FullscreenLoader
            translucent
            description={formatMessage({ id: "importNew.readingMetadata" })}
         />
      );
   }

   return (
      <ImportNewFileContext.Provider
         value={{
            files,
            setFiles,
            selectedFile,
            setSelectedFile,
            options,
            setOptions,
         }}
      >
         <div className="grid-cols-[17rem_minmax(35rem,_3fr)_minmax(20rem,_2fr)] max-xl:grid-cols-[17rem_minmax(35rem,_2fr)_auto] grid grid-row-[1fr] max-h-full h-full p-4 gap-2">
            <div
               className={
                  "col-span-1 flex flex-col p-4 pr-2 bg-radix-gray-a200 rounded-3xl h-[calc(100vh-var(--fullscreen-header-height)-2rem)]"
               }
            >
               <div
                  className={cls(
                     " overflow-y-auto custom-scrollbar light-scrollbar"
                  )}
               >
                  <ImportNewFileOptions />
               </div>
            </div>

            <div
               className={
                  "col-span-1 flex flex-col h-[calc(100vh-var(--fullscreen-header-height)-2rem)]"
               }
            >
               <div className={cls("overflow-y-auto custom-scrollbar")}>
                  <Reorder.Group
                     values={files}
                     onReorder={setFiles}
                     className="flex flex-col gap-2"
                  >
                     {files.map((file) => (
                        <FileImportElement file={file} key={file.path} />
                     ))}
                  </Reorder.Group>
               </div>
            </div>

            <div
               className={
                  "col-span-1 flex flex-col p-4 pr-2 bg-radix-gray-a200 rounded-3xl h-[calc(100vh-var(--fullscreen-header-height)-2rem)]"
               }
            >
               {selectedFile ? (
                  <div
                     className={cls(
                        "overflow-y-auto custom-scrollbar light-scrollbar"
                     )}
                  >
                     <AudiobookDetails />
                  </div>
               ) : (
                  <div className="center h-full">
                     <p className="font-bold text-lg">
                        <FormattedMessage
                           id="importNew.clickDetailsButton"
                           values={{
                              icon: (
                                 <InlineIcon
                                    icon="ph:info-bold"
                                    className="inline"
                                 />
                              ),
                           }}
                        />
                     </p>
                  </div>
               )}
            </div>
         </div>
      </ImportNewFileContext.Provider>
   );
};
