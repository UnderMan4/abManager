import { AnimatePresence, Variants, motion } from "framer-motion";
import React, { FC, useMemo } from "react";
import { FormatNumberOptions, useIntl } from "react-intl";
import { useHover } from "usehooks-ts";

import { cls } from "@/utils/styleUtils";

export type ProgressBarProps = {
   className?: string;
   value: number;
   max: number;
   mode?: "indeterminate" | "determinate";
   displayValueOnHover?: boolean;
   displayMaxValue?: boolean;
   displayMode?: "percent" | "value" | "unit";
   displayUnit?: string;
   displayCustomValue?: (value: number, max: number) => string;
   displayFormatOptions?: FormatNumberOptions;
   displayPending?: string;
};

const containerVariants: Variants = {
   hovered: {
      height: "100%",
   },
   unhovered: {
      height: "0.5rem",
   },
};

const textVariants: Variants = {
   hovered: {
      opacity: 1,
   },
   unhovered: {
      opacity: 0,
   },
};

export const ProgressBar: FC<ProgressBarProps> = ({
   className,
   value,
   max,
   mode = "determinate",
   displayCustomValue,
   displayMaxValue,
   displayMode = "percent",
   displayUnit,
   displayValueOnHover,
   displayFormatOptions = {},
   displayPending,
}) => {
   const percent = value / max;

   const { formatNumber } = useIntl();

   const ref = React.useRef<HTMLDivElement>(null);
   const isHovering = useHover(ref);

   const displayValue = useMemo(() => {
      if (displayCustomValue) {
         return displayCustomValue(value, max);
      }

      if (displayMode === "percent") {
         return formatNumber(percent, {
            style: "percent",
            maximumFractionDigits: 0,
            ...displayFormatOptions,
         });
      }

      if (displayMode === "value") {
         if (displayMaxValue) {
            return `${formatNumber(value, displayFormatOptions)} / ${formatNumber(max, displayFormatOptions)}`;
         } else {
            return formatNumber(value, displayFormatOptions);
         }
      }

      if (displayMode === "unit") {
         if (displayMaxValue) {
            return `${formatNumber(value, {
               style: "unit",
               unit: displayUnit,
               ...displayFormatOptions,
            })} / ${formatNumber(max, {
               style: "unit",
               unit: displayUnit,
               ...displayFormatOptions,
            })}`;
         } else {
            return formatNumber(value, {
               style: "unit",
               unit: displayUnit,
               ...displayFormatOptions,
            });
         }
      }
      return formatNumber(value);
   }, [
      value,
      max,
      displayMode,
      displayUnit,
      displayMaxValue,
      displayFormatOptions,
      displayCustomValue,
   ]);
   return (
      <div className={cls("h-6 center w-full", className)} ref={ref}>
         <motion.div
            className="width-full grow relative bg-white/5 rounded-3xl overflow-hidden"
            variants={containerVariants}
            animate={
               isHovering &&
               (mode === "determinate" ||
                  (mode === "indeterminate" && !!displayPending))
                  ? "hovered"
                  : "unhovered"
            }
         >
            {mode === "determinate" && (
               <>
                  <motion.div
                     className="absolute inset-0 bg-radix-indigo-600 rounded-2xl overflow-hidden text-center"
                     animate={{
                        right: `${100 - percent * 100}%`,
                     }}
                  ></motion.div>
                  <AnimatePresence>
                     {displayValueOnHover && isHovering && (
                        <motion.div
                           className="absolute inset-0 text-center center"
                           style={{
                              fontSize: "1rem",
                              lineHeight: "1rem",
                           }}
                           variants={textVariants}
                           initial="unhovered"
                           animate="hovered"
                           exit="unhovered"
                        >
                           <span>{displayValue}</span>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </>
            )}
            {mode === "indeterminate" && (
               <>
                  <div className="absolute inset-0 progress-pending-bg"></div>
                  <AnimatePresence>
                     {displayValueOnHover && isHovering && displayPending && (
                        <motion.div
                           className="absolute inset-0 text-center center z-10"
                           style={{
                              fontSize: "1rem",
                              lineHeight: "1rem",
                           }}
                           variants={textVariants}
                           initial="unhovered"
                           animate="hovered"
                           exit="unhovered"
                        >
                           <span>{displayPending}</span>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </>
            )}
         </motion.div>
      </div>
   );
};
