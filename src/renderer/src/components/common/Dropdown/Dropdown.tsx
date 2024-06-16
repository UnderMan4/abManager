import { flip, offset, shift, useFloating } from "@floating-ui/react";
import { Icon } from "@iconify/react";
import { AnimatePresence, Variants, m } from "framer-motion";
import {
   FC,
   ReactElement,
   useEffect,
   useLayoutEffect,
   useRef,
   useState,
} from "react";
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

export type DropdownElement =
   | ReactElement<DropdownOptionProps>
   | ReactElement<DropdownOptionSeparatorProps>;

export type DropdownProps = {
   className?: string;
   onChange?: (value: Set<SelectedValue>) => void;
   children?: DropdownElement[] | DropdownElement;
   options?: DropdownOptions;
};

export type SelectedValue = {
   value: string;
   label: string;
};

export type DropdownOptions = {
   multiselect?: boolean;
   defaultValue?: SelectedValue | SelectedValue[];
   placeholder?: string;
   label?: string;
};

export type DropdownState = {
   selectedValue: Set<SelectedValue>;
   setSelectedValue: (value: SelectedValue) => void;
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
   const [selectedValue, setSelectedValue] = useState<Set<SelectedValue>>(
      options?.defaultValue
         ? Array.isArray(options.defaultValue)
            ? new Set(options?.defaultValue)
            : new Set([options.defaultValue])
         : new Set()
   );

   useEffect(() => {
      console.log(selectedValue);
   }, [selectedValue]);
   const [isOpen, setIsOpen] = useState(false);

   const [state] = useObjectState<DropdownState>({
      selectedValue,
      setSelectedValue: (newValue) => {
         if (options?.multiselect) {
            setSelectedValue((prev) => {
               if ([...prev].some((value) => value.value === newValue.value)) {
                  return new Set(
                     [...prev].filter((value) => value.value !== newValue.value)
                  );
               }
               return new Set([...prev, newValue]);
            });
         } else {
            setSelectedValue(new Set([newValue]));
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
   }, [buttonRef.current, isOpen]);

   const { refs, floatingStyles } = useFloating({
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
      <div className={twMerge("flex w-64", className)}>
         <div ref={refs.setReference} className="w-full">
            <button
               className={cls(
                  "rounded-xl pl-4 pr-3 py-2 flex gap-2 items-center w-full justify-between",
                  "bg-radix-gray-500 border border-radix-gray-800"
               )}
               onClick={() => setIsOpen((prev) => !prev)}
               ref={buttonRef}
            >
               {selectedValue.size > 0 ? (
                  options?.multiselect ? (
                     <div className="flex overflow-hidden gap-2 items-center">
                        {Array.from(selectedValue).map((value, index) => (
                           <>
                              <span className="text-nowrap" key={value.value}>
                                 {value.label}
                              </span>
                              {index < selectedValue.size - 1 && (
                                 <div className="rounded-full size-1 bg-radix-gray-1200 shrink-0" />
                              )}
                           </>
                        ))}
                     </div>
                  ) : (
                     <span className="text-ellipsis overflow-hidden whitespace-nowrap">
                        {selectedValue.values().next().value.label}
                     </span>
                  )
               ) : (
                  <span className="text-radix-gray-1000 text-ellipsis overflow-hidden whitespace-nowrap">
                     {options?.placeholder}
                  </span>
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
                           "bg-radix-gray-400 border border-radix-gray-700 rounded-xl shadow-lg p-1"
                        )}
                        style={{ ...floatingStyles, width: buttonWidth }}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                     >
                        <div
                           className={cls(
                              "flex flex-col max-h-64 gap-1 overflow-y-auto custom-scrollbar light-scrollbar"
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
