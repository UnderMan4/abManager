import {
   forwardRef,
   useCallback,
   useImperativeHandle,
   useRef,
   useState,
} from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { Modal, ModalRef } from "@/components/common/Modal";
import { MethodButton } from "@/features/navbar/components/AddNewModal/MethodButton";
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
   const { formatMessage } = useIntl();
   const importMethodModalRef = useRef<ModalRef>(null);
   const importFileModalRef = useRef<ModalRef>(null);

   const [canOpenDialog, setCanOpenDialog] = useState(true);

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
      if (!canOpenDialog) return;

      setData({ type: "file" });

      setCanOpenDialog(false);
      const result = await window.api.showOpenDialog({
         properties: ["multiSelections", "openFile"],
      });
      setCanOpenDialog(true);
      if (!result || result.canceled) return;

      setData({ dirs: result.filePaths });
      handleNextStep();
   }, [setData]);

   const selectFolder = useCallback(async () => {
      if (!canOpenDialog) return;

      setData({ type: "folder" });

      setCanOpenDialog(false);
      const result = await window.api.showOpenDialog({
         properties: ["openDirectory"],
      });
      setCanOpenDialog(true);

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
            contentClassName="flex gap-5"
            title={formatMessage({ id: "navbar.addNew.importAudiobooks" })}
            onDismiss={handleDismiss}
         >
            <MethodButton icon="ph:file-bold" onClick={selectFile}>
               <FormattedMessage id="navbar.addNew.selectFile" />
            </MethodButton>
            <MethodButton icon="ph:folder-open-bold" onClick={selectFolder}>
               <FormattedMessage id="navbar.addNew.selectFolder" />
            </MethodButton>
         </Modal>
         <ImportFilesModal
            handleDismiss={handleDismiss}
            data={data}
            ref={importFileModalRef}
         />
      </>
   );
});
