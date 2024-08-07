import { Reorder } from "framer-motion";
import { Stats } from "fs";
import { IAudioMetadata } from "music-metadata";
import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useLocation } from "react-router-dom";

import { FullscreenLoader } from "@/components/common";
import { FileImportElement } from "@/features/importNew/components/FileImportElement";
import { prepareToast } from "@/utils/toastUtils";

export type FileData = {
   path: string;
   stats: Stats;
   audioMetadata: IAudioMetadata;
   isSelected: boolean;
};
export const ImportNewFile: FC = () => {
   const [isLoading, setIsLoading] = useState(true);
   const { state } = useLocation();

   const { formatMessage } = useIntl();

   const [files, setFiles] = useState<FileData[]>([]);
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
                  id: "toasts.importFileRead.description",
               }),
               id: "importFileRead",
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
      <div>
         <Reorder.Group
            values={files}
            onReorder={setFiles}
            className="flex flex-col gap-2 p-4"
         >
            {files.map((file) => (
               <FileImportElement file={file} key={file.path} />
            ))}
         </Reorder.Group>
      </div>
   );
};
