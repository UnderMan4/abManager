import { Icon } from "@iconify/react";
import { Variants, motion } from "framer-motion";
import { useMemo, useRef } from "react";
import {
   AriaSelectProps,
   HiddenSelect,
   mergeProps,
   useButton,
   useFocusRing,
   useSelect,
} from "react-aria";
import { FormattedMessage } from "react-intl";
import { useSelectState } from "react-stately";

import { ListBox, Popover } from "@/components/common";
import { cls } from "@/utils/styleUtils";

export type DropdownProps<T> = AriaSelectProps<T> & {
   className?: string;
};

const chevronVariants: Variants = {
   open: { rotate: 180 },
   closed: { rotate: 0 },
};
export const Dropdown = <T extends object>(props: DropdownProps<T>) => {
   const { className, label, name, isDisabled } = props;
   const state = useSelectState(props);
   const ref = useRef<HTMLButtonElement>(null);
   const { labelProps, triggerProps, valueProps, menuProps } = useSelect(
      props,
      state,
      ref
   );
   const { buttonProps } = useButton(triggerProps, ref);

   const { focusProps, isFocusVisible } = useFocusRing();

   const elementWidth = useMemo(() => {
      if (ref.current) {
         return ref.current.offsetWidth;
      }
      return 56 * 16;
   }, [ref.current]);

   return (
      <div className={cls("flex w-64 flex-col gap-1", className)}>
         <div {...labelProps}>{label}</div>
         <HiddenSelect
            state={state}
            triggerRef={ref}
            label={label}
            name={name}
         />
         <button
            className={cls(
               "rounded-xl pl-4 pr-3 py-2 flex gap-2 items-center w-full justify-between group outline-none",
               "bg-radix-gray-500 border border-radix-gray-800",
               "disabled:bg-radix-gray-400 disabled:border-radix-gray-700",
               {
                  "focus:ring-2 focus:ring-radix-gray-1200": isFocusVisible,
               }
            )}
            ref={ref}
            {...mergeProps(buttonProps, focusProps)}
         >
            <span
               {...valueProps}
               className={cls(
                  "text-ellipsis overflow-hidden whitespace-nowrap",
                  {
                     "text-radix-gray-1000": isDisabled,
                     "text-radix-gray-1100": !state.selectedItem && !isDisabled,
                     "text-radix-gray-900": !state.selectedItem && isDisabled,
                  }
               )}
            >
               {state.selectedItem ? (
                  state.selectedItem.rendered
               ) : (
                  <FormattedMessage id="common.dropdown.select" />
               )}
            </span>
            <motion.div
               variants={chevronVariants}
               animate={state.isOpen ? "open" : "closed"}
               initial="closed"
               className="flex items-center justify-center h-full shrink-0"
            >
               <Icon
                  icon="ph:caret-down-bold"
                  height="1rem"
                  className={cls({
                     "text-radix-gray-1000": isDisabled,
                  })}
               />
            </motion.div>
         </button>
         {/* TODO: Fix high of the dropdown when it does not fit on the screen */}
         {state.isOpen && (
            <Popover
               state={state}
               triggerRef={ref}
               placement="bottom start"
               className="mt-1 max-h-80 overflow-y-auto custom-scrollbar light-scrollbar gutter-auto"
               style={{ width: elementWidth }}
            >
               <ListBox
                  {...menuProps}
                  state={state}
                  // className="max-h-80 overflow-y-auto custom-scrollbar light-scrollbar w-full h-full"
               />
            </Popover>
         )}
      </div>
   );
};
