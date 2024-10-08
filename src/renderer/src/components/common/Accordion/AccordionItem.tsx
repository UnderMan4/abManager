import { Icon } from "@iconify/react";
import { Variants, motion } from "framer-motion";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import { useFocusRing, useId } from "react-aria";
import { twMerge } from "tailwind-merge";

import { AccordionContext } from "@/components/common/Accordion/AccordionRoot";
import { useSafeContext } from "@/hooks";
import { cls } from "@/utils/styleUtils";

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

   const { toggleItem, openItems } = useSafeContext(
      AccordionContext,
      "AccordionItem should be used within an AccordionRoot component"
   );
   const [isOpen, setIsOpen] = useState(defaultOpen ?? false);

   const { isFocusVisible, focusProps } = useFocusRing();

   useEffect(() => {
      setIsOpen(openItems.has(id));
   }, [openItems]);

   return (
      <div className={twMerge("", className)} {...props}>
         <button
            className={cls("flex w-full items-center px-2 py-1 rounded-lg", {
               "focus-ring": isFocusVisible,
            })}
            onClick={toggleItem.bind(null, id)}
            {...focusProps}
         >
            <span className="grow text-left text-lg font-bold">{label}</span>
            <motion.div
               variants={chevronVariants}
               animate={isOpen ? "open" : "closed"}
               initial="closed"
            >
               <Icon icon="ph:caret-down-bold" />
            </motion.div>
         </button>
         <motion.div
            className="overflow-hidden"
            initial={false}
            animate={{ height: isOpen ? "auto" : 0 }}
         >
            <div className="p-2">{props.children}</div>
         </motion.div>
      </div>
   );
};
