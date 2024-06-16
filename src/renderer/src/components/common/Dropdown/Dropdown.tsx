import { flip, offset, shift, useFloating } from "@floating-ui/react";
import { Icon } from "@iconify/react";
import { AnimatePresence, Variants, m } from "framer-motion";
import { FC, ReactElement, useLayoutEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useHover, useOnClickOutside } from "usehooks-ts";

import {
   DropdownOptionProps,
   DropdownOptionSeparatorProps,
} from "@/components/common/Dropdown/DropdownOption";
import { useObjectState } from "@/hooks";
import { createNullableContext } from "@/utils/componentUtils";
import { cls } from "@/utils/styleUtils";

import { Portal } from "../Portal";

export type DropdownProps = {
   className?: string;
   onChange?: (value: Set<string>) => void;
   children?: (
      | ReactElement<DropdownOptionProps>
      | ReactElement<DropdownOptionSeparatorProps>
   )[];
   options?: DropdownOptions;
};

export type DropdownOptions = {
   multiselect?: boolean;
   defaultValue?: string | string[];
   placeholder?: string;
   label?: string;
};

export type DropdownState = {
   selectedValue: Set<string>;
   setSelectedValue: (value: string) => void;
   isOpen: boolean;
};

export const DropdownContext = createNullableContext<DropdownState>();

const chevronVariants: Variants = {
   open: { rotate: 180 },
   closed: { rotate: 0 },
};

export const Dropdown: FC<DropdownProps> = ({
   className,
   onChange,
   options,
   children,
}) => {
   const [selectedValue, setSelectedValue] = useState<Set<string>>(
      options?.defaultValue ? new Set(options?.defaultValue) : new Set()
   );

   const [isOpen, setIsOpen] = useState(false);

   const [state] = useObjectState<DropdownState>({
      selectedValue,
      setSelectedValue: (value: string) => {
         if (options?.multiselect) {
            setSelectedValue((prev) => {
               const newSet = new Set(prev);
               if (newSet.has(value)) {
                  newSet.delete(value);
               } else {
                  newSet.add(value);
               }
               return newSet;
            });
         } else {
            setSelectedValue(new Set([value]));
            setIsOpen(false);
         }

         onChange?.(selectedValue);
      },
      isOpen,
   });

   const buttonRef = useRef<HTMLButtonElement>(null);

   const [buttonWidth, setButtonWidth] = useState(0);

   useLayoutEffect(() => {
      if (buttonRef.current) {
         setButtonWidth(buttonRef.current.offsetWidth);
      }
   }, [buttonRef.current]);

   const { refs, floatingStyles, context } = useFloating({
      placement: "bottom-start",
      open: isOpen,
      middleware: [offset(10), flip(), shift()],
   });

   const isHoveringButton = useHover(buttonRef);

   useOnClickOutside(refs.floating, () => {
      if (isHoveringButton) return;
      setIsOpen(false);
   });

   return (
      <div className={twMerge("flex", className)}>
         <div ref={refs.setReference}>
            <button
               className={cls(
                  "rounded-xl pl-4 pr-3 py-2 flex gap-2 items-center min-w-64 justify-between",
                  "bg-radix-gray-500 border-2 border-radix-gray-800"
               )}
               onClick={() => setIsOpen((prev) => !prev)}
               ref={buttonRef}
            >
               {selectedValue.size > 0 ? (
                  <>
                     {selectedValue.forEach((value) => (
                        <span>{value}</span>
                     ))}
                  </>
               ) : (
                  <span>{options?.placeholder}</span>
               )}
               <m.div
                  variants={chevronVariants}
                  animate={isOpen ? "open" : "closed"}
                  initial="closed"
                  className="flex items-center justify-center h-full"
               >
                  <Icon icon="ph:caret-down-bold"></Icon>
               </m.div>
            </button>
         </div>

         <DropdownContext.Provider value={state}>
            <Portal portalId="dropdown">
               <AnimatePresence>
                  {isOpen && (
                     <m.div
                        ref={refs.setFloating}
                        className={cls(
                           "overflow-hidden",
                           "bg-radix-gray-400 border-2 border-radix-gray-700 rounded-xl shadow-lg p-1"
                        )}
                        style={{ ...floatingStyles, width: buttonWidth }}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                     >
                        <div
                           className={cls(
                              "flex flex-col max-h-64 overflow-y-auto custom-scrollbar light-scrollbar"
                           )}
                        >
                           {children}
                        </div>
                     </m.div>
                  )}
               </AnimatePresence>
            </Portal>
         </DropdownContext.Provider>
      </div>
   );
};
