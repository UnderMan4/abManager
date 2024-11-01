import { Check, Info } from "@phosphor-icons/react";
import { AriaCheckboxProps, useCheckbox } from "@react-aria/checkbox";
import { useFocusRing } from "@react-aria/focus";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useToggleState } from "@react-stately/toggle";
import { Variants, m as motion } from "framer-motion";
import { FC, ReactNode, useRef } from "react";
import { useId } from "react-aria";

import { Tooltip } from "@/components/common/Tooltip";
import { cls } from "@/utils/styleUtils";

export type CheckboxProps = AriaCheckboxProps & {
   className?: string;
   label?: string;
   description?: ReactNode;
   descriptionAsTooltip?: boolean;
};

export const Checkbox: FC<CheckboxProps> = ({
   className,
   label,
   description,
   descriptionAsTooltip,
   id,
   ...props
}) => {
   const state = useToggleState(props);
   const ref = useRef(null);
   const { inputProps } = useCheckbox(props, state, ref);
   const { isFocusVisible, focusProps } = useFocusRing();

   const checkboxId = useId(id);

   const checkboxVariants: Variants = {
      checked: {
         opacity: 1,
         rotate: 0,
         scale: 1,
      },
      unchecked: {
         opacity: 0,
         rotate: 45,
         scale: 0,
      },
   };

   return (
      <div className="flex">
         <label className={cls("relative flex gap-2", className)}>
            <VisuallyHidden>
               <input
                  {...inputProps}
                  {...focusProps}
                  ref={ref}
                  className="-z-20"
                  aria-label={label}
                  id={checkboxId}
               />
            </VisuallyHidden>
            <div
               className={cls(
                  "size-6 rounded-lg transition-colors duration-75 select-none flex-shrink-0",
                  {
                     "bg-primary": state.isSelected,
                     "bg-primary/25": !state.isSelected,
                     "ring-2 ring-radix-gray-1200": isFocusVisible,
                  }
               )}
            >
               <motion.div
                  key="icon"
                  transition={{ duration: 0.075 }}
                  variants={checkboxVariants}
                  initial={state.isSelected ? "checked" : "unchecked"}
                  animate={state.isSelected ? "checked" : "unchecked"}
                  className="flex items-center justify-center w-full h-full pointer-events-none"
               >
                  <Check weight="bold" className="text-primary-50" />
               </motion.div>
            </div>
            {label && (
               <label htmlFor={checkboxId}>
                  <div className="flex gap-2 items-center">
                     <span className="truncate">{label}</span>
                     {description && descriptionAsTooltip ? (
                        <Tooltip content={description}>
                           <Info weight="bold" />
                        </Tooltip>
                     ) : null}
                  </div>
                  {description && !descriptionAsTooltip ? (
                     typeof description === "string" ||
                     typeof description === "number" ? (
                        <p className="font-light text-sm text-radix-gray-1100">
                           {description}
                        </p>
                     ) : (
                        description
                     )
                  ) : null}
               </label>
            )}
         </label>
      </div>
   );
};
