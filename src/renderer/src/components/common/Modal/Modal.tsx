import { FC, ReactNode, useRef } from "react";
import { AriaModalOverlayProps, Overlay, useModalOverlay } from "react-aria";
import { OverlayTriggerState } from "react-stately";

import { CardProps } from "@/components/common/Card";

import { Dialog, DialogProps } from "./Dialog";

export type ModalProps = AriaModalOverlayProps & {
   state: OverlayTriggerState;
   children: ReactNode | ReactNode[];
   cardProps?: Omit<CardProps, "children">;
   dialogProps?: Omit<DialogProps, "children" | "cardProps">;
};

export const Modal: FC<ModalProps> = ({
   state,
   children,
   cardProps,
   dialogProps,
   ...props
}) => {
   const ref = useRef<HTMLDivElement>(null);
   const { modalProps, underlayProps } = useModalOverlay(props, state, ref);

   if (!state.isOpen) {
      return null;
   }
   return (
      <Overlay>
         <div
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center"
            {...underlayProps}
         >
            <div {...modalProps} ref={ref}>
               <Dialog {...dialogProps} cardProps={cardProps}>
                  {children}
               </Dialog>
            </div>
         </div>
      </Overlay>
   );
};
