import { Icon } from "@iconify/react";
import { Reorder, useDragControls } from "framer-motion";
import { FC } from "react";

import { ArrayCover } from "@/components/common";
import { Heading } from "@/components/common/Heading";
import { FileData } from "@/features/importNew";
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
   return (
      <Reorder.Item
         value={file}
         className={cls("flex gap-4")}
         dragListener={false}
         dragControls={controls}
         key={file.path}
      >
         <div
            className="flex flex-col center bg-red-600 cursor-grab select-none p-1"
            onPointerDown={(e) => controls.start(e)}
         >
            <Icon icon="ph:equals-bold" height="1.2rem" />
         </div>
         <ArrayCover data={cover} className="pointer-events-none" />
         <div>
            <Heading as="h4">{title}</Heading>
            <div>{authors?.join(", ")}</div>
            {series && (
               <div>
                  {series}
                  {seriesPart && ` ${seriesPart}`}
               </div>
            )}
         </div>
      </Reorder.Item>
   );
};
