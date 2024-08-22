import { toast } from "sonner";

import {
   ProgressBarProps,
   ProgressToast,
   Toast,
   ToastVariant,
} from "@/components/common";

export type ToasterProgramParams = {
   title: string;
   description?: string;
   id?: string;
};

export type ProgressToastParams = {
   title: string;
   description?: string;
   progress: ProgressBarProps;
   secondaryProgress?: ProgressBarProps;
   id: string;
};

export type ToasterProgram = (params: ToasterProgramParams) => void;
export type ToasterProgressProgram = (params: ProgressToastParams) => void;
export type PrepareToast = Record<ToastVariant, ToasterProgram> & {
   progress: ToasterProgressProgram;
};

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

//TODO: add show more button for error toasts
const error = createToasterProgram("error");
const success = createToasterProgram("success");
const info = createToasterProgram("info");
const warning = createToasterProgram("warning");

const progress = ({
   title,
   description,
   progress,
   secondaryProgress,
   id,
}: ProgressToastParams) => {
   toast.custom(
      () => (
         <ProgressToast
            title={title}
            description={description}
            progress={{ ...progress }}
            secondaryProgress={
               secondaryProgress ? { ...secondaryProgress } : undefined
            }
         />
      ),
      {
         id,
      }
   );
};

export const prepareToast: PrepareToast = {
   error,
   success,
   info,
   warning,
   progress,
};
