import { X } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";
import { FC, ReactNode } from "react";

import { ScrollArea } from "@/components/common";
import { cls } from "@/utils/styleUtils";

export type ModalProps = {
   className?: string;
   renderTrigger: ReactNode;
   title?: ReactNode;
   renderFooter?: ReactNode;
   onConfirm?: () => void;
   onCancel?: () => void;
   children?: ReactNode | ReactNode[];
   hideX?: boolean;
};

export const Modal: FC<ModalProps> = ({
   className,
   renderTrigger,
   renderFooter,
   onCancel,
   onConfirm,
   hideX,
   children,
   title,
}) => {
   return (
      <Dialog.Root>
         <Dialog.Trigger asChild>{renderTrigger}</Dialog.Trigger>
         <Dialog.Portal>
            <Dialog.Overlay className="bg-black/50 fixed inset-0 top-10 z-30" />
            <Dialog.Content
               className={cls(
                  "z-40 bg-radix-gray-600 fixed absolute-center rounded-2xl",
                  "bg-radix-gray-600 border border-radix-gray-700 shadow-lg shadow-radix-gray-100",
                  "max-h-[calc(100%-8rem)] max-w-[calc(100%-8rem)]",
                  "flex flex-col"
               )}
               forceMount
            >
               {!hideX && (
                  <Dialog.Close asChild>
                     <button className="absolute top-2 right-2 text-radix-gray-1200 hover:text-radix-gray-1100 transition-colors">
                        <X weight="bold" size={20} />
                     </button>
                  </Dialog.Close>
               )}
               {title && (
                  <>
                     <Dialog.Title
                        asChild={!(typeof title).is("string", "number")}
                        className="text-xl font-bold p-4"
                     >
                        {title}
                     </Dialog.Title>
                     <div className="h-[0.2px] bg-radix-gray-700" />
                  </>
               )}
               <ScrollArea className="p-4 min-h-0">{children}</ScrollArea>
               {renderFooter && (
                  <>
                     <div className="h-[0.2px] bg-radix-gray-700" />
                     <div className="flex justify-end p-4 gap-4">
                        {renderFooter}
                     </div>
                  </>
               )}
            </Dialog.Content>
         </Dialog.Portal>
      </Dialog.Root>
   );
};
