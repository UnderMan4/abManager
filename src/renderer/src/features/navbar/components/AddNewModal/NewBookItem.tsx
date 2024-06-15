import React, { FC } from "react";
import { twMerge } from "tailwind-merge";

import { ArrayCover } from "@/components/common/ArrayCover";
import { Checkbox } from "@/components/common/Checkbox";
import { FileData } from "@/features/navbar/components/AddNewModal/ImportFilesModal";

export type NewBookItemProps = FileData & {
   setIsChecked: (path: string, isChecked: boolean) => void;
};

export const NewBookItem: FC<NewBookItemProps> = ({
   audioMetadata,
   path,
   isSelected,
   setIsChecked,
}) => {
   const title = audioMetadata.common?.title;
   const cover = audioMetadata.common?.picture?.[0];
   const authors = audioMetadata.common?.artists;
   const series = audioMetadata.common?.album;
   const seriesPart = audioMetadata.common?.track.no;
   const year = audioMetadata.common?.year;

   return (
      <div
         className="flex gap-2 bg-radix-gray-400 p-2 rounded-2xl items-center w-full overflow-hidden flex-shrink-0"
         key={path}
      >
         <Checkbox
            className="flex gap-2 shrink-0"
            isSelected={isSelected}
            onChange={(value) => setIsChecked(path, value)}
            aria-label={title ? `${title} by ${authors?.join(", ")}` : path}
         />
         <div className="flex gap-2 w-full min-w-0">
            <ArrayCover data={cover} size="sm" />
            <div className="flex flex-col w-full min-w-0">
               <div className="max-w-full pr-3 overflow-hidden overflow-ellipsis whitespace-nowrap">
                  <span className="font-bold text-lg">{title}</span>
               </div>
               <span className="text-sm text-radix-gray-1100 font-bold">
                  {authors?.join(", ")}
               </span>
               {series && (
                  <span className="text-sm text-radix-gray-1100">
                     {series}
                     {seriesPart && ` ${seriesPart}`}
                  </span>
               )}
            </div>
         </div>
      </div>
   );
};
