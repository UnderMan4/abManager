import { FC } from "react";
import { twMerge } from "tailwind-merge";

import { Button } from "@/components/common";
import { Modal } from "@/components/common/Modal";

export type ImportTypeStepProps = {
   className?: string;
};

export const ImportTypeStep: FC<ImportTypeStepProps> = ({ className }) => {
   return (
      <Modal>
         <Button></Button>
      </Modal>
   );
};
