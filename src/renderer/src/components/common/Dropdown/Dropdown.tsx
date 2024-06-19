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

export type DropdownProps = {
   className?: string;
   onChange?: (value: Set<SelectedValue>) => void;
   children?: DropdownElement[] | DropdownElement;
   options?: DropdownOptions;
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
   const buttonRef = useRef<HTMLButtonElement>(null);

   const [buttonWidth, setButtonWidth] = useState(0);

   const state = useDropdownState({ options, onChange });

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
                  "rounded-xl pl-4 pr-3 py-2 flex gap-2 items-center w-full justify-between",
                  "bg-radix-gray-500 border border-radix-gray-800"
               )}
               onClick={() => state.setIsOpen((prev) => !prev)}
               ref={buttonRef}
            >
               {state.selectedValue.size > 0 ? (
                  options?.multiselect ? (
                     <DropdownMultiselectList list={state.selectedValue} />
                  ) : (
                     <span className="text-ellipsis overflow-hidden whitespace-nowrap">
                        {state.selectedValue.values().next().value.label}
                     </span>
                  )
               ) : (
                  <span className="text-radix-gray-1000 text-ellipsis overflow-hidden whitespace-nowrap">
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
