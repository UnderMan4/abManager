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
   openItem: (id: string) => void;
   closeItem: (id: string) => void;
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
   if (!children) return null;

   const [openItems, setOpenItems] = useState(new Set<string>());

   const openItem = useCallback(
      (id: string) => {
         console.log("openItem");
         setOpenItems((prev) => {
            if (options?.allowMultipleExpanded) {
               const newSet = new Set(prev);
               newSet.add(id);
               return newSet;
            }
            return new Set([id]);
         });
      },
      [options?.allowMultipleExpanded, setOpenItems]
   );

   const closeItem = useCallback(
      (id: string) => {
         console.log("closeItem");
         setOpenItems((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
         });
      },
      [setOpenItems]
   );

   const [state, setState] = useObjectState<AccordionState>({
      openItems,
      openItem,
      closeItem,
      allowMultipleExpanded: options?.allowMultipleExpanded ?? false,
   });

   useEffect(() => {
      setState({ openItems });
   }, [openItems]);

   return (
      <div className={twMerge("", className)} ref={accordionRef}>
         <AccordionContext.Provider value={state}>
            {children}
         </AccordionContext.Provider>
      </div>
   );
};
