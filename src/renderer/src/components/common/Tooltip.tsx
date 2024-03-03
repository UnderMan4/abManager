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
import { AnimatePresence, Variants } from "framer-motion";
import { m } from "framer-motion";
import {
   AriaRole,
   FC,
   MouseEventHandler,
   ReactNode,
   useRef,
   useState,
} from "react";
import { twMerge } from "tailwind-merge";

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
            type="button"
            ref={refs.setReference}
            {...getReferenceProps()}
            onClick={onClick}
         >
            {children}
         </button>
         <AnimatePresence>
            {isOpen && (
               <m.div
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
               </m.div>
            )}
         </AnimatePresence>
      </div>
   );
};
