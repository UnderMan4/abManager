import { FC, useRef } from "react";

import { Button } from "@/components/common";
import { Modal, ModalRef } from "@/components/common/Modal";

export type ImportAudiobookModalProps = {
   className?: string;
};

export const ImportAudiobookModal: FC<ImportAudiobookModalProps> = ({
   className,
}) => {
   const modalRef = useRef<ModalRef>(null);
   return (
      <Modal ref={modalRef}>
         <Button>Test</Button>
      </Modal>
   );
};
