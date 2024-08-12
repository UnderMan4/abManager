import { Icon } from "@iconify/react";
import type { ComboBoxProps as ComboBoxPropsAria } from "@react-types/combobox";
import { Variants, motion } from "framer-motion";
import { useMemo, useRef } from "react";
import {
   mergeProps,
   useButton,
   useComboBox,
   useFilter,
   useFocusRing,
} from "react-aria";
import { useComboBoxState } from "react-stately";

import { ListBox, Popover } from "@/components/common";
import { cls } from "@/utils/styleUtils";

export type ComboBoxProps<T> = ComboBoxPropsAria<T> & {
   className?: string;
};

const chevronVariants: Variants = {
   open: { rotate: 180 },
   closed: { rotate: 0 },
};
export const ComboBox = <T extends object>(props: ComboBoxProps<T>) => {
   const { className, label } = props;

   const { contains } = useFilter({
      sensitivity: "base",
   });
   const state = useComboBoxState({ ...props, defaultFilter: contains });

   const buttonRef = useRef<HTMLButtonElement>(null);
   const inputRef = useRef<HTMLInputElement>(null);
   const listBoxRef = useRef<HTMLUListElement>(null);
   const popoverRef = useRef<HTMLDivElement>(null);
   const containerRef = useRef<HTMLDivElement>(null);

   const {
      buttonProps: triggerProps,
      inputProps,
      listBoxProps,
      labelProps,
   } = useComboBox(
      { ...props, buttonRef, inputRef, listBoxRef, popoverRef },
      state
   );

   const { focusProps, isFocusVisible } = useFocusRing();

   const { buttonProps } = useButton(triggerProps, buttonRef);

   const elementWidth = useMemo(() => {
      if (containerRef.current) {
         return containerRef.current.offsetWidth;
      }
      return 56 * 16;
   }, [containerRef.current]);

   return (
      <div className={cls("flex flex-col gap-1", className)}>
         <label {...labelProps} className="">
            {label}
         </label>
         <div
            ref={containerRef}
            className={cls(
               "flex w-64 rounded-xl",
               "bg-radix-gray-500 border border-radix-gray-800 items-stretch",
               {
                  "ring-2 ring-radix-gray-1200": isFocusVisible,
               }
            )}
         >
            <div className=" flex grow border-r-radix-gray-800 border-r">
               {/* TODO: Fix focus outline */}
               <input
                  {...mergeProps(inputProps, focusProps)}
                  ref={inputRef}
                  className={cls(
                     "grow bg-transparent rounded-l-xl border-none border-0 focus:border-0 outline-none"
                  )}
               />
            </div>
            <button
               {...buttonProps}
               ref={buttonRef}
               className="flex items-center justify-center shrink-0 p-3"
            >
               <motion.div
                  variants={chevronVariants}
                  animate={state.isOpen ? "open" : "closed"}
                  initial="closed"
                  className="flex items-center justify-center h-full w-full shrink-0"
               >
                  <Icon height="1rem" icon="ph:caret-down-bold" />
               </motion.div>
            </button>
         </div>
         {state.isOpen && (
            <Popover
               popoverRef={popoverRef}
               triggerRef={inputRef}
               state={state}
               isNonModal
               placement="bottom start"
               style={{ width: elementWidth }}
               className="mt-1 max-h-80 overflow-y-auto custom-scrollbar light-scrollbar"
            >
               <ListBox
                  {...listBoxProps}
                  listBoxRef={listBoxRef}
                  state={state}
               />
            </Popover>
         )}
      </div>
   );
};
