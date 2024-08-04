import React, { FC, RefObject, useRef } from "react";
import {
   AriaPopoverProps,
   DismissButton,
   Overlay,
   mergeProps,
   usePopover,
} from "react-aria";
import { OverlayTriggerState } from "react-stately";

import { cls } from "@/utils/styleUtils";

export type PopoverProps = Omit<AriaPopoverProps, "popoverRef"> & {
   className?: string;
   children: React.ReactNode;
   state: OverlayTriggerState;
   popoverRef?: RefObject<HTMLDivElement>;
   useTranslucentUnderlay?: boolean;
   style?: React.CSSProperties;
};

export const Popover: FC<PopoverProps> = (props) => {
   const ref = useRef<HTMLDivElement>(null);
   const {
      state,
      children,
      className,
      isNonModal,
      popoverRef = ref,
      useTranslucentUnderlay,
      style,
   } = props;

   const { popoverProps, underlayProps } = usePopover(
      { ...props, popoverRef },
      state
   );

   return (
      <Overlay>
         {!isNonModal && (
            <div
               {...underlayProps}
               className={cls("fixed inset-0", {
                  "bg-black opacity-30": useTranslucentUnderlay,
                  "pointer-events-none": !useTranslucentUnderlay,
               })}
            />
         )}
         <div
            {...mergeProps(popoverProps, {
               style: { ...popoverProps.style, ...style },
            })}
            ref={popoverRef}
         >
            <div
               className={cls(
                  "h-full bg-radix-gray-400 border border-radix-gray-700 rounded-xl shadow-lg p-1 overflow-hidden",
                  className
               )}
            >
               {!isNonModal && <DismissButton onDismiss={state.close} />}
               {children}
               <DismissButton onDismiss={state.close} />
            </div>
         </div>
      </Overlay>
   );
};
