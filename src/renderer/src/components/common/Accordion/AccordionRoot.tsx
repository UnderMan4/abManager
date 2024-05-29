import React, { FC, useEffect, useState } from "react";
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
};

export const AccordionContext = React.createContext<AccordionState | null>(
   null
);

export const AccordionRoot: FC<AccordionRootProps> = ({
   className,
   children,
   options,
}) => {
   const accordionRef = React.useRef<HTMLDivElement>(null);
   if (!children) return null;

   const [openItems, setOpenItems] = useState(new Set<string>());

   const openItem = (id: string) => {
      console.log("openItem");
      setOpenItems((prev) => {
         if (options?.allowMultipleExpanded) {
            return new Set([...prev, id]);
         }
         return new Set([id]);
      });
   };

   const closeItem = (id: string) => {
      console.log("closeItem");
      setOpenItems((prev) => {
         const next = new Set(prev);
         next.delete(id);
         return next;
      });
   };

   const [state] = useObjectState<AccordionState>({
      openItems,
      openItem,
      closeItem,
   });

   return (
      <div className={twMerge("", className)} ref={accordionRef}>
         <AccordionContext.Provider value={state}>
            {children}
         </AccordionContext.Provider>
      </div>
   );
};
