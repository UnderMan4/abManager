import { toast } from "sonner";

import { Toast, ToastVariant } from "@/components/common";

export type ToasterProgramParams = {
   title: string;
   description?: string;
   id?: string;
};

export type ToasterProgram = (params: ToasterProgramParams) => void;
export type PrepareToast = Record<ToastVariant, ToasterProgram>;

const createToasterProgram = (variant: ToastVariant): ToasterProgram => {
   return ({ title, description, id }) => {
      toast.custom(
         () => (
            <Toast variant={variant} title={title} description={description} />
         ),
         {
            id,
         }
      );
   };
};

//TODO: add show more for error toasts
const error = createToasterProgram("error");
const success = createToasterProgram("success");
const info = createToasterProgram("info");
const warning = createToasterProgram("warning");

export const prepareToast: PrepareToast = { error, success, info, warning };
