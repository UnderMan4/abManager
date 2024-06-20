import { flip, offset, shift, useFloating } from "@floating-ui/react";
import { Icon } from "@iconify/react";
import { Variants, m } from "framer-motion";
import { FC, useLayoutEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useHover, useOnClickOutside } from "usehooks-ts";

import { createNullableContext } from "@/utils/componentUtils";
import { cls } from "@/utils/styleUtils";

import { DropdownMenu } from "./DropdownMenu";
import { DropdownMultiselectList } from "./DropdownMultiselectList";
import { DropdownState, useDropdownState } from "./hooks";
import { DropdownElement, DropdownOptions, SelectedValue } from "./types";

export type DropdownProps<Multiselect extends boolean> = {
   className?: string;
   onChange?: (value: Set<SelectedValue>) => void;
   children?: DropdownElement[] | DropdownElement;
   options?: DropdownOptions<Multiselect>;
   disabled?: boolean;
};

export const DropdownContext = createNullableContext<DropdownState>();

const chevronVariants: Variants = {
   open: { rotate: 180 },
   closed: { rotate: 0 },
};

//TODO: Add a11y
export const Dropdown = <Multiselect extends boolean>({
   className,
   onChange,
   options,
   children,
   disabled,
}: DropdownProps<Multiselect>) => {
   const buttonRef = useRef<HTMLButtonElement>(null);

   const [buttonWidth, setButtonWidth] = useState(0);

   const state = useDropdownState({ options, onChange, children });

   useLayoutEffect(() => {
      if (buttonRef.current) {
         setButtonWidth(buttonRef.current.offsetWidth);
      }
   }, [buttonRef.current, state.isOpen]);

   const floating = useFloating({
      placement: "bottom-start",
      open: state.isOpen,
      middleware: [offset(10), flip(), shift()],
   });

   const isHoveringButton = useHover(buttonRef);

   useOnClickOutside(floating.refs.floating, () => {
      if (isHoveringButton) return;
      state.setIsOpen(false);
   });

   return (
      <div className={twMerge("flex w-64", className)}>
         <div ref={floating.refs.setReference} className="w-full">
            <button
               className={cls(
                  "rounded-xl pl-4 pr-3 py-2 flex gap-2 items-center w-full justify-between group",
                  "bg-radix-gray-500 border border-radix-gray-800",
                  "disabled:bg-radix-gray-400 disabled:border-radix-gray-700"
               )}
               onClick={() => state.setIsOpen((prev) => !prev)}
               ref={buttonRef}
               disabled={disabled}
            >
               {state.selectedValues.size > 0 ? (
                  options?.multiselect ? (
                     <DropdownMultiselectList
                        list={state.selectedValues}
                        disabled={disabled}
                     />
                  ) : (
                     <span
                        className={cls(
                           "text-ellipsis overflow-hidden whitespace-nowrap",
                           {
                              "text-radix-gray-1000": disabled,
                           }
                        )}
                     >
                        {state.selectedValues.values().next().value.label}
                     </span>
                  )
               ) : (
                  <span
                     className={cls(
                        "text-radix-gray-1000 text-ellipsis overflow-hidden whitespace-nowrap",
                        {
                           "text-radix-gray-700": disabled,
                        }
                     )}
                  >
                     {options?.placeholder}
                  </span>
               )}
               <m.div
                  variants={chevronVariants}
                  animate={state.isOpen ? "open" : "closed"}
                  initial="closed"
                  className="flex items-center justify-center h-full shrink-0"
               >
                  <Icon icon="ph:caret-down-bold" height="1rem" />
               </m.div>
            </button>
         </div>

         <DropdownContext.Provider value={state}>
            <DropdownMenu {...floating} buttonWidth={buttonWidth}>
               {children}
            </DropdownMenu>
         </DropdownContext.Provider>
      </div>
   );
};
