import { Stats } from "fs";
import { use } from "i18next";
import { IAudioMetadata } from "music-metadata";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { set } from "react-hook-form";

import { Button } from "@/components/common";
import { AccordionItem, AccordionRoot } from "@/components/common/Accordion";
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
            <AccordionRoot>
               <AccordionItem label="Advanced options">
                  <p>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Ex?
                  </p>
               </AccordionItem>
               <AccordionItem label="Advanced options 2">
                  <p>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Voluptas amet fugit quos temporibus earum expedita harum
                     assumenda, et numquam cum consequatur, unde perferendis
                     veniam ipsum. Doloribus quae cumque fugiat assumenda.
                  </p>
               </AccordionItem>
               <AccordionItem label="Advanced options 3">
                  <p>
                     Distinctio maiores harum vero modi, dolorem molestiae ex
                     eligendi. Asperiores unde saepe dolorum necessitatibus in,
                     ipsam mollitia odit eius? Adipisci labore obcaecati
                     nesciunt rerum distinctio pariatur eligendi doloremque
                     atque. Accusantium?
                  </p>
               </AccordionItem>
               <AccordionItem label="Advanced options 4">
                  <p>
                     Deserunt consequatur laborum est consequuntur libero.
                     Officia commodi omnis exercitationem corrupti placeat, esse
                     velit error corporis, tenetur quos ut illo possimus
                     perspiciatis, odio nemo ullam aperiam porro fugiat
                     consequuntur! Similique.
                  </p>
               </AccordionItem>
               <AccordionItem label="Advanced options 5">
                  <p>
                     Deleniti molestias rerum assumenda nemo exercitationem?
                     Nemo quam autem omnis dolor eos sunt architecto quod ea
                     molestias esse eaque, odit ipsa sequi laboriosam eveniet
                     eius dignissimos. Iusto explicabo inventore placeat?
                  </p>
               </AccordionItem>
               <AccordionItem label="Advanced options 6">
                  <p>
                     Perspiciatis unde illum ea, quas rerum quos aperiam iste
                     repudiandae ipsum reiciendis sequi tempora ab, natus ut
                     dolorem nihil voluptates ratione consectetur veniam, iusto
                     delectus earum labore! Est, quo officiis!
                  </p>
               </AccordionItem>
            </AccordionRoot>
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

            <div className="flex flex-col gap-3">
               {filesRead.map(({ audioMetadata, path, isSelected }) => {
                  const title = audioMetadata.common?.title;
                  const cover = audioMetadata.common?.picture?.[0];
                  const authors = audioMetadata.common?.artists;
                  const series = audioMetadata.common?.album;
                  const seriesPart = audioMetadata.common?.track.no;
                  const year = audioMetadata.common?.year;

                  return (
                     <div
                        className="flex gap-2 bg-radix-gray-400 p-2 rounded-2xl items-center w-full overflow-hidden"
                        key={path}
                     >
                        <Checkbox
                           className="flex gap-2 shrink-0"
                           isSelected={isSelected}
                           onChange={(value) => setIsChecked(path, value)}
                           aria-label={
                              title
                                 ? `${title} by ${authors?.join(", ")}`
                                 : path
                           }
                        />
                        <div className="flex gap-2 w-full min-w-0">
                           <ArrayCover data={cover} size="sm" />
                           <div className="flex flex-col w-full min-w-0">
                              <div className="max-w-full pr-3 overflow-hidden overflow-ellipsis whitespace-nowrap">
                                 <span className="font-bold text-lg">
                                    {title}
                                 </span>
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
               })}
            </div>
         </Modal>
      );
   }
);
