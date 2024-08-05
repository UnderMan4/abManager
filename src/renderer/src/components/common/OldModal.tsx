import FocusTrap from "focus-trap-react";
import { AnimatePresence } from "framer-motion";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

import { Portal } from "@/components/common/Portal";
import { cls } from "@/utils/styleUtils";

import { Card, CardProps } from "./Card";

export type OldModalProps = CardProps & {
   onDismiss?: () => void;
};

export type OldModalRef = {
   open: () => void;
   close: () => void;
   isOpen: boolean;
};

export const OldModal = forwardRef<OldModalRef, OldModalProps>(
   ({ onDismiss, ...cardProps }, ref) => {
      const [isOpen, setIsOpen] = useState(false);

      const modalRef = useRef<HTMLDivElement>(null);

      useOnClickOutside(modalRef, () => {
         onDismiss?.();
         setIsOpen(false);
      });
      useImperativeHandle(ref, () => ({
         open: () => {
            setIsOpen(true);
         },
         close: () => {
            setIsOpen(false);
         },
         isOpen,
      }));

      return (
         <Portal portalId="modal">
            <AnimatePresence>
               {isOpen && (
                  <div className="absolute inset-0 bg-black opacity-30" />
               )}
            </AnimatePresence>
            <AnimatePresence>
               {isOpen && (
                  <div className="absolute inset-0 flex center">
                     <FocusTrap>
                        <div
                           ref={modalRef}
                           onKeyDown={(e) => {
                              if (e.key === "Escape") {
                                 onDismiss?.();
                                 setIsOpen(false);
                              }
                           }}
                        >
                           <Card
                              {...cardProps}
                              className={cls(
                                 "max-h-[calc(100vh-4rem)] max-w-[calc(100vw-4rem)] overflow-y-auto",
                                 cardProps.className
                              )}
                           />
                        </div>
                     </FocusTrap>
                  </div>
               )}
            </AnimatePresence>
         </Portal>
      );
   }
);
