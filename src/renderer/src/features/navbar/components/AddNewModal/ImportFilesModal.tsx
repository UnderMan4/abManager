import { Stats } from "fs";
import { IAudioMetadata } from "music-metadata";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { Button } from "@/components/common";
import { AccordionItem, AccordionRoot } from "@/components/common/Accordion";
import { Checkbox } from "@/components/common/Checkbox";
import { OldModal, OldModalRef } from "@/components/common/OldModal";
import { AddNewModalData } from "@/features/navbar/components/AddNewModal/AddNewModal";
import { NewBookItem } from "@/features/navbar/components/AddNewModal/NewBookItem";
import { useObjectState } from "@/hooks";

export type ImportFilesModalProps = {
   data: AddNewModalData;
   handleDismiss: () => void;
};

export type AdvancedOptions = {
   oneBook: boolean;
   sortType: "auto" | "fileName" | "trackNumber";
};

export type FileData = {
   path: string;
   stats: Stats;
   audioMetadata: IAudioMetadata;
   isSelected: boolean;
};

export const ImportFilesModal = forwardRef<OldModalRef, ImportFilesModalProps>(
   ({ data, handleDismiss }, ref) => {
      const [filesRead, setFilesRead] = useState<FileData[]>([]);
      const { formatMessage } = useIntl();
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

      const [advancedOptions, setAdvancedOptions] =
         useObjectState<AdvancedOptions>({
            oneBook: false,
            sortType: "auto",
         });

      return (
         <OldModal
            ref={ref}
            onDismiss={handleDismiss}
            contentClassName="flex flex-col gap-2 w-[32rem]"
            rightButton={{
               label: formatMessage({ id: "common.buttons.import" }),
            }}
            leftButton={{
               label: formatMessage({ id: "common.buttons.cancel" }),
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
                  <FormattedMessage id="common.buttons.selectAll" />
               </Button>
               <Button
                  appearance="outlineGray"
                  mini
                  onClick={deselectAll}
                  icon="ph:square"
               >
                  <FormattedMessage id="common.buttons.deselectAll" />
               </Button>
            </div>

            <div className="flex flex-col gap-3 max-h-[32rem] overflow-y-auto custom-scrollbar">
               {filesRead.map((data) => (
                  <NewBookItem {...data} setIsChecked={setIsChecked} />
               ))}
            </div>

            <AccordionRoot options={{ allowMultipleExpanded: true }}>
               <AccordionItem
                  label={formatMessage({
                     id: "navbar.addNew.advancedOptions.label",
                  })}
               >
                  <Checkbox
                     label={formatMessage({
                        id: "navbar.addNew.advancedOptions.oneBook.label",
                     })}
                     isSelected={advancedOptions.oneBook}
                     onChange={(value) =>
                        setAdvancedOptions({ oneBook: value })
                     }
                     descriptionAsTooltip
                     description={formatMessage({
                        id: "navbar.addNew.advancedOptions.oneBook.description",
                     })}
                  />
               </AccordionItem>
            </AccordionRoot>
         </OldModal>
      );
   }
);
