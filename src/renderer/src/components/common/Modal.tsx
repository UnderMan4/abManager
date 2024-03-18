import FocusTrap from "focus-trap-react";
import { AnimatePresence } from "framer-motion";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

import { Portal } from "@/components/common/Portal";

import { Card, CardProps } from "./Card";

export type ModalProps = CardProps;

export type ModalRef = {
   open: () => void;
   close: () => void;
   isOpen: boolean;
};

export const Modal = forwardRef<ModalRef, ModalProps>(
   ({ ...cardProps }, ref) => {
      const [isOpen, setIsOpen] = useState(false);

      const modalRef = useRef<HTMLDivElement>(null);

      useOnClickOutside(modalRef, () => setIsOpen(false));
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
                              if (e.key === "Escape") setIsOpen(false);
                           }}
                        >
                           <Card {...cardProps} />
                        </div>
                     </FocusTrap>
                  </div>
               )}
            </AnimatePresence>
         </Portal>
      );
   }
);
