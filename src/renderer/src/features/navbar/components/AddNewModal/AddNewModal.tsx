import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { Button } from "@/components/common";
import { Modal, ModalRef } from "@/components/common/Modal";
import { useObjectState } from "@/hooks";

import { ImportFilesModal } from "./ImportFilesModal";

export type AddNewModalRef = ModalRef & {
   data: AddNewModalData;
};

export type AddNewModalData = {
   type: "file" | "folder" | undefined;
   dirs: string[];
   currentStep: number | null;
};

export const AddNewModal = forwardRef<AddNewModalRef>((_, ref) => {
   const importMethodModalRef = useRef<ModalRef>(null);
   const importFileModalRef = useRef<ModalRef>(null);

   const [data, setData] = useObjectState<AddNewModalData>({
      type: undefined,
      dirs: [],
      currentStep: null,
   });

   useImperativeHandle(ref, () => ({
      open: () => {
         importMethodModalRef.current?.open();
         setData({ currentStep: 1 });
      },
      close: () => {
         importMethodModalRef.current?.close();
         importFileModalRef.current?.close();
         setData({ currentStep: null });
      },
      isOpen:
         importMethodModalRef.current?.isOpen ||
         importFileModalRef.current?.isOpen ||
         false,
      data,
   }));

   const handleNextStep = useCallback(() => {
      if (data.currentStep === 1) {
         importMethodModalRef.current?.close();
         importFileModalRef.current?.open();
         setData({ currentStep: 2 });
      }
   }, [data, setData]);

   const selectFile = useCallback(async () => {
      setData({ type: "file" });
      const result = await window.api.showOpenDialog({
         properties: ["multiSelections", "openFile"],
      });

      if (!result || result.canceled) return;

      setData({ dirs: result.filePaths });
      handleNextStep();
   }, [setData]);

   const selectFolder = useCallback(async () => {
      setData({ type: "folder" });
      const result = await window.api.showOpenDialog({
         properties: ["openDirectory"],
      });

      if (!result || result.canceled) return;

      setData({ dirs: result.filePaths });
      handleNextStep();
   }, [setData]);

   const handleDismiss = useCallback(() => {
      setData({ currentStep: null, type: undefined, dirs: [] });
   }, [setData]);

   return (
      <>
         <Modal
            ref={importMethodModalRef}
            contentClassName="flex flex-col gap-3"
            title="Import new"
            onDismiss={handleDismiss}
         >
            <Button icon="ph:file-bold" onClick={selectFile}>
               File
            </Button>
            <Button icon="ph:folder-open-bold" onClick={selectFolder}>
               Folder
            </Button>
         </Modal>
         <ImportFilesModal
            handleDismiss={handleDismiss}
            data={data}
            ref={importFileModalRef}
         />
      </>
   );
});