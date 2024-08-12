import { Icon } from "@iconify/react";
import { Reorder, useDragControls } from "framer-motion";
import { FC } from "react";

import { ArrayCover } from "@/components/common";
import { Heading } from "@/components/common/Heading";
import { IconButton } from "@/components/forms";
import { FileData } from "@/features/importNew";
import { useImportNewFileContext } from "@/hooks/contexts/useImportNewFileContext";
import { cls } from "@/utils/styleUtils";

export type FileImportElementProps = {
   file: FileData;
};

export const FileImportElement: FC<FileImportElementProps> = ({ file }) => {
   const controls = useDragControls();

   const title = file.audioMetadata.common?.title;
   const cover = file.audioMetadata.common?.picture?.[0];
   const authors = file.audioMetadata.common?.artists;
   const series = file.audioMetadata.common?.album;
   const seriesPart = file.audioMetadata.common?.track.no;
   const filename = window.path.basename(file.path);

   const { setSelectedFile } = useImportNewFileContext();
   return (
      <Reorder.Item
         value={file}
         className={cls("flex gap-4 bg-radix-gray-400 p-3 rounded-2xl w-full")}
         dragListener={false}
         dragControls={controls}
         key={file.path}
      >
         <div
            className="flex flex-col center cursor-grab select-none p-1"
            onPointerDown={(e) => controls.start(e)}
         >
            <Icon icon="ph:dots-six-vertical-bold" height="1.2rem" />
         </div>
         <ArrayCover data={cover} className="pointer-events-none" />
         <div className="min-w-0 flex-1">
            <Heading as="h4">{title}</Heading>
            <p className="text-radix-gray-1100 text-sm">
               {authors?.join(", ")}
            </p>
            {series && (
               <p>
                  {series}
                  {seriesPart && ` ${seriesPart}`}
               </p>
            )}
            <p className="text-radix-gray-1100 truncate">{filename}</p>
         </div>

         <div className="flex flex-col center">
            <IconButton
               icon="ph:info-bold"
               className="grow-0"
               appearance="outlineColor"
               onClick={() => setSelectedFile(file)}
            />
         </div>
      </Reorder.Item>
   );
};
