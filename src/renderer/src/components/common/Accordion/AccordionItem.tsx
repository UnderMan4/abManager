import { Icon } from "@iconify/react";
import { Variants, m } from "framer-motion";
import {
   FC,
   HTMLAttributes,
   useCallback,
   useEffect,
   useLayoutEffect,
   useRef,
   useState,
} from "react";
import { useButton, useFocusRing, useId } from "react-aria";
import { set } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { AccordionContext } from "@/components/common/Accordion/AccordionRoot";
import { useSafeContext } from "@/hooks";

export type AccordionItemProps = {
   className?: string;
   defaultOpen?: boolean;
   label: string;
} & HTMLAttributes<HTMLDivElement>;

const chevronVariants: Variants = {
   open: { rotate: 180 },
   closed: { rotate: 0 },
};

export const AccordionItem: FC<AccordionItemProps> = ({
   className,
   defaultOpen,
   label,
   ...props
}) => {
   const id = useId(props.id);

   const { closeItem, openItem, openItems } = useSafeContext(
      AccordionContext,
      "AccordionItem should be used within an AccordionRoot"
   );
   const [isOpen, setIsOpen] = useState(defaultOpen);

   const onHeaderClick = useCallback(() => {
      console.log("onHeaderClick", isOpen, id);
      if (isOpen) {
         closeItem(id);
      } else {
         openItem(id);
      }
   }, [openItem, closeItem, id]);

   const { isFocusVisible, focusProps } = useFocusRing();

   useEffect(() => {
      if (defaultOpen) {
         openItem(id);
      }
   }, []);

   useEffect(() => {
      console.log("openItems", openItems, id, openItems.has(id));
      setIsOpen(openItems.has(id));
   }, [openItems]);

   return (
      <div className={twMerge("", className)} {...props}>
         <button
            className="flex w-full items-center"
            onClick={onHeaderClick}
            {...focusProps}
         >
            <span className="grow text-left text-lg font-bold">{label}</span>
            <m.div
               variants={chevronVariants}
               animate={isOpen ? "open" : "closed"}
               initial="closed"
            >
               <Icon icon="ph:caret-down-bold" />
            </m.div>
         </button>
         <m.div
            className="overflow-hidden"
            initial={false}
            animate={{ height: isOpen ? "auto" : 0 }}
         >
            <div>{props.children}</div>
         </m.div>
      </div>
   );
};
