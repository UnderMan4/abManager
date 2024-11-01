import { Info } from "@phosphor-icons/react";
import { Variants, motion } from "framer-motion";
import { FC, ReactNode, useRef } from "react";
import { AriaRadioProps, useRadio, useVisuallyHidden } from "react-aria";

import { Tooltip } from "@/components/common/Tooltip";
import { useSafeContext } from "@/hooks/useSafeContext";
import { cls } from "@/utils/styleUtils";

import { RadioContext } from "./RadioGroup";

export type RadioButtonProps = AriaRadioProps & {
   label: string;
   description?: ReactNode;
   descriptionAsTooltip?: boolean;
};

export const RadioButton: FC<RadioButtonProps> = ({
   label,
   description,
   descriptionAsTooltip,
   ...radioProps
}) => {
   const state = useSafeContext(
      RadioContext,
      "RadioButton should be used within a RadioGroup"
   );

   const inputRef = useRef<HTMLInputElement>(null);
   const { inputProps } = useRadio(radioProps, state, inputRef);

   const { visuallyHiddenProps } = useVisuallyHidden();

   const dotVariants: Variants = {
      checked: {
         scale: 1,
      },
      unchecked: {
         scale: 0,
      },
   };

   return (
      <label className="flex flex-col gap-1 select-none">
         <input
            type="radio"
            aria-label={label}
            {...visuallyHiddenProps}
            {...inputProps}
            ref={inputRef}
         />
         <div className="flex gap-3">
            <div
               className={cls(
                  "size-6 rounded-full center duration-200 transition-colors",
                  {
                     "bg-primary": state.selectedValue === radioProps.value,
                     "bg-primary/25": state.selectedValue !== radioProps.value,
                  }
               )}
            >
               <motion.div
                  variants={dotVariants}
                  initial="unchecked"
                  animate={
                     state.selectedValue === radioProps.value
                        ? "checked"
                        : "unchecked"
                  }
                  transition={{
                     duration: 0.1,
                     ease: "easeOut",
                  }}
                  className="size-2 bg-white rounded-full"
               />
            </div>
            <div className="flex items-center gap-2">
               <span>{label}</span>
               {description && descriptionAsTooltip ? (
                  <Tooltip content={description}>
                     <Info weight="bold" />
                  </Tooltip>
               ) : null}
            </div>
         </div>
         {description && !descriptionAsTooltip ? (
            typeof description === "string" ||
            typeof description === "number" ? (
               <p className="font-light text-sm text-radix-gray-1100 pl-9">
                  {description}
               </p>
            ) : (
               description
            )
         ) : null}
      </label>
   );
};
