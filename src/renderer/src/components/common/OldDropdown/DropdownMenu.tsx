import { useFloating } from "@floating-ui/react";
import { AnimatePresence, m } from "framer-motion";
import { FC } from "react";

import { Portal } from "@/components/common/Portal";
import { useSafeContext } from "@/hooks";
import { cls } from "@/utils/styleUtils";

import { DropdownContext } from "./Dropdown";
import { DropdownElement } from "./types";

export type DropdownMenuProps = ReturnType<typeof useFloating> & {
   buttonWidth: number;
   children?: DropdownElement[] | DropdownElement;
};
export const DropdownMenu: FC<DropdownMenuProps> = ({
   refs,
   buttonWidth,
   children,
   floatingStyles,
}) => {
   const { isOpen } = useSafeContext(
      DropdownContext,
      "DropdownMenu should not be used"
   );
   return (
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
   );
};
