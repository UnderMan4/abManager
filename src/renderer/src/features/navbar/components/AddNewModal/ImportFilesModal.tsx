import { Stats } from "fs";
import { use } from "i18next";
import { IAudioMetadata } from "music-metadata";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { set } from "react-hook-form";

import { Button } from "@/components/common";
import { AccordionItem, AccordionRoot } from "@/components/common/Accordion";
import { ArrayCover } from "@/components/common/ArrayCover";
import { Checkbox } from "@/components/common/Checkbox";
import { Modal, ModalRef } from "@/components/common/Modal";
import { AddNewModalData } from "@/features/navbar/components/AddNewModal/AddNewModal";
import { NewBookItem } from "@/features/navbar/components/AddNewModal/NewBookItem";

export type ImportFilesModalProps = {
   data: AddNewModalData;
   handleDismiss: () => void;
};

export type FileData = {
   path: string;
   stats: Stats;
   audioMetadata: IAudioMetadata;
   isSelected: boolean;
};

export const ImportFilesModal = forwardRef<ModalRef, ImportFilesModalProps>(
   ({ data, handleDismiss }, ref) => {
      const [filesRead, setFilesRead] = useState<FileData[]>([]);
      useEffect(() => {
         if (data.type !== "file") {
            setFilesRead([]);
            return;
         }

         const promises = data.dirs.map(async (dir) => {
            const metadata = await window.fs.readFileMetadata(dir);
            if ("error" in metadata) {
               console.error(metadata.error);
               return null;
            }
            console.log(metadata);
            return { ...metadata, path: dir, isSelected: true };
         });

         Promise.all(promises)
            .then((results) => {
               const filteredResults = results.filter(
                  (result) => result !== null
               ) as FileData[];
               setFilesRead(filteredResults);
            })
            .catch((error) => {
               console.error(error);
            });
      }, [data]);

      const setIsChecked = useCallback(
         (path: string, isChecked: boolean) => {
            setFilesRead((prev) =>
               prev.map((file) =>
                  file.path === path ? { ...file, isSelected: isChecked } : file
               )
            );
         },
         [setFilesRead]
      );

      const selectAll = useCallback(() => {
         setFilesRead((prev) =>
            prev.map((file) => ({ ...file, isSelected: true }))
         );
      }, [setFilesRead]);

      const deselectAll = useCallback(() => {
         setFilesRead((prev) =>
            prev.map((file) => ({ ...file, isSelected: false }))
         );
      }, [setFilesRead]);

      return (
         <Modal
            ref={ref}
            onDismiss={handleDismiss}
            contentClassName="flex flex-col gap-2 w-[32rem]"
            rightButton={{
               label: "Import",
            }}
            leftButton={{
               label: "Cancel",
               onClick: handleDismiss,
               appearance: "outlineGray",
            }}
         >
            <div className="flex gap-3">
               <Button
                  appearance="outlineGray"
                  mini
                  onClick={selectAll}
                  icon="ph:check-square"
               >
                  Select all
               </Button>
               <Button
                  appearance="outlineGray"
                  mini
                  onClick={deselectAll}
                  icon="ph:square"
               >
                  Deselect all
               </Button>
            </div>

            <div className="flex flex-col gap-3 max-h-[32rem] overflow-y-auto custom-scrollbar">
               {filesRead.map((data) => (
                  <NewBookItem {...data} setIsChecked={setIsChecked} />
               ))}
            </div>

            <AccordionRoot options={{ allowMultipleExpanded: true }}>
               <AccordionItem label="Advanced options">
                  <Checkbox
                     label="One book"
                     descriptionAsTooltip
                     description="If checked all selected files are treated as parts of one book"
                  />
               </AccordionItem>
            </AccordionRoot>
         </Modal>
      );
   }
);
