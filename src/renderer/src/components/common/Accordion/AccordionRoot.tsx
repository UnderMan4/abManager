import React, { FC, useCallback, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { AccordionItemProps } from "@/components/common/Accordion/AccordionItem";
import { useObjectState } from "@/hooks";

export type AccordionRootProps = {
   className?: string;
   children?:
      | React.ReactElement<AccordionItemProps>
      | React.ReactElement<AccordionItemProps>[];
   options?: AccordionOptions;
};

export type AccordionOptions = {
   allowMultipleExpanded?: boolean;
};

export type AccordionState = {
   openItems: Set<string>;
   toggleItem: (id: string) => void;
   allowMultipleExpanded: boolean;
};

export const AccordionContext = React.createContext<AccordionState | null>(
   null
);

export const AccordionRoot: FC<AccordionRootProps> = ({
   className,
   children,
   options = { allowMultipleExpanded: false },
}) => {
   const accordionRef = React.useRef<HTMLDivElement>(null);

   const [openItems, setOpenItems] = useState(new Set<string>());
   const toggleItem = useCallback((id: string) => {
      if (options.allowMultipleExpanded) {
         setOpenItems((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
               newSet.delete(id);
            } else {
               newSet.add(id);
            }
            return newSet;
         });
      } else {
         setOpenItems((prev) => {
            return prev.has(id) ? new Set() : new Set([id]);
         });
      }
   }, []);

   const [state, setState] = useObjectState<AccordionState>({
      openItems,
      toggleItem,
      allowMultipleExpanded: options?.allowMultipleExpanded ?? false,
   });

   useEffect(() => {
      setState({ openItems });
   }, [openItems]);

   if (!children) return null;

   return (
      <div className={twMerge("", className)} ref={accordionRef}>
         <AccordionContext.Provider value={state}>
            {children}
         </AccordionContext.Provider>
      </div>
   );
};
