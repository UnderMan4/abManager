import { toast } from "sonner";

import { Toast, ToastVariant } from "@/components/common";

export type ToasterProgram = (title: string, deccription?: string) => void;
export type PrepareToast = Record<ToastVariant, ToasterProgram>;

const createToasterProgram = (variant: ToastVariant): ToasterProgram => {
   return (title, description) => {
      toast.custom(() => (
         <Toast variant={variant} title={title} subtitle={description} />
      ));
   };
};

const error = createToasterProgram("error");
const success = createToasterProgram("success");
const info = createToasterProgram("info");
const warning = createToasterProgram("warning");

export const prepareToast: PrepareToast = { error, success, info, warning };
