import { Stats } from "fs";
import { IAudioMetadata } from "music-metadata";
import { forwardRef, useEffect, useState } from "react";
import { set } from "react-hook-form";

import { Button } from "@/components/common";
import { Checkbox } from "@/components/common/Checkbox";
import { Modal, ModalRef } from "@/components/common/Modal";
import { AddNewModalData } from "@/features/navbar/components/AddNewModal/AddNewModal";

import { ArrayCover } from "../../../../components/common/ArrayCover";

export type ImportFilesModalProps = {
   data: AddNewModalData;
   handleDismiss: () => void;
};

export type FileData = {
   path: string;
   stats: Stats;
   audioMetadata: IAudioMetadata;
};

export const ImportFilesModal = forwardRef<ModalRef, ImportFilesModalProps>(
   ({ data, handleDismiss }, ref) => {
      const [filesRead, setFilesRead] = useState<FileData[]>([]);
      useEffect(() => {
         if (data.type !== "file") {
            setFilesRead([]);
            return;
         }
         data.dirs.forEach(async (dir) => {
            const metadata = await window.fs.readFileMetadata(dir);
            if ("error" in metadata) {
               console.error(metadata.error);
               return;
            }
            console.log(metadata);
            setFilesRead((prev) => [...prev, { ...metadata, path: dir }]);
         });
      }, [data]);
      return (
         <Modal ref={ref} onDismiss={handleDismiss}>
            <Button>Test</Button>
            <div className="flex flex-col gap-3">
               {filesRead.map(({ audioMetadata, path }) => {
                  const title = audioMetadata.common?.title;
                  const cover = audioMetadata.common?.picture?.[0];
                  const authors = audioMetadata.common?.artists;
                  const series = audioMetadata.common?.album;
                  const seriesPart = audioMetadata.common?.track.no;
                  const year = audioMetadata.common?.year;

                  return (
                     <div
                        className="flex gap-2 bg-radix-gray-400 p-2 rounded-2xl items-center"
                        key={path}
                     >
                        <Checkbox className="flex gap-2" />
                        <div className="flex gap-2">
                           <ArrayCover data={cover} size="sm" />
                           <div className="flex flex-col h-full">
                              <span className="font-bold text-lg">{title}</span>
                              <span className="text-sm text-radix-gray-1100">
                                 {authors?.join(", ")}
                              </span>
                           </div>
                        </div>
                     </div>
                  );
               })}
            </div>
         </Modal>
      );
   }
);
