import {
   FloatingArrow,
   UseRoleProps,
   arrow,
   autoUpdate,
   flip,
   offset,
   shift,
   useDismiss,
   useFloating,
   useFocus,
   useHover,
   useInteractions,
   useRole,
} from "@floating-ui/react";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { FC, MouseEventHandler, ReactNode, useRef, useState } from "react";
import { useFocusRing } from "react-aria";
import { twMerge } from "tailwind-merge";

import { cls } from "@/utils/styleUtils";

import { Portal } from "./Portal";

export type TooltipProps = {
   className?: string;
   content: ReactNode;
   children: ReactNode;
   onClick?: () => MouseEventHandler<HTMLButtonElement>;
   role?: UseRoleProps["role"];
};

const tooltipVariants: Variants = {
   hidden: {
      opacity: 0,
   },
   visible: {
      opacity: 1,
   },
};

export const Tooltip: FC<TooltipProps> = ({
   className,
   children,
   content,
   onClick,
   role,
}) => {
   const [isOpen, setIsOpen] = useState(false);

   const arrowRef = useRef<SVGSVGElement>(null);

   const { refs, floatingStyles, context } = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: "top-start",
      strategy: "absolute",
      middleware: [
         offset(10),
         flip(),
         shift(),
         arrow({
            element: arrowRef,
            padding: 10,
         }),
      ],
      whileElementsMounted: autoUpdate,
   });

   const { isFocusVisible, focusProps } = useFocusRing();
   const hover = useHover(context, { move: false });
   const focus = useFocus(context);
   const dismiss = useDismiss(context);
   const _role = useRole(context, {
      role: role ?? "tooltip",
   });

   const { getFloatingProps, getReferenceProps } = useInteractions([
      hover,
      focus,
      dismiss,
      _role,
   ]);

   return (
      <div className={twMerge("relative", className)}>
         <button
            className={cls("outline-none rounded-full", {
               "ring-2 ring-radix-gray-1200": isFocusVisible,
               "cursor-default": !onClick,
            })}
            type="button"
            ref={refs.setReference}
            {...getReferenceProps(focusProps)}
            onClick={onClick}
         >
            {children}
         </button>
         <Portal portalId="tooltip">
            <AnimatePresence>
               {isOpen && (
                  <motion.div
                     initial="hidden"
                     animate="visible"
                     variants={tooltipVariants}
                     exit="hidden"
                     ref={refs.setFloating}
                     style={floatingStyles}
                     className="absolute bg-radix-gray-600 p-2 rounded-lg transition-none w-max max-w-sm"
                     {...getFloatingProps()}
                  >
                     {content}
                     <FloatingArrow
                        className="fill-radix-gray-600 transition-none"
                        ref={arrowRef}
                        context={context}
                     />
                  </motion.div>
               )}
            </AnimatePresence>
         </Portal>
      </div>
   );
};
