import {
   CheckCircle,
   Dot,
   DotOutline,
   X,
   XCircle,
} from "@phosphor-icons/react";
import * as Progress from "@radix-ui/react-progress";
import { Variants, motion } from "framer-motion";
import { FC, ReactNode, useId, useMemo } from "react";
import { FormatNumberOptions, FormattedMessage, useIntl } from "react-intl";

import { Spinner } from "@/components/common";
import { Unit } from "@/types/common";
import { cls } from "@/utils/styleUtils";

export type ProgressStatus = "error" | "success" | "progress" | "pending";

export type ProgressBarProps = {
   className?: string;
   value: number;
   max: number;
   label?: ReactNode;
   description?: ReactNode;
   status?: ProgressStatus;
   errorMessage?: ReactNode;
   timeRemaining?: number;
   onCanceled?: () => void;
   displayFormatOptions?: FormatNumberOptions & { unit?: Unit };
   // mode?: "indeterminate" | "determinate";
   // displayValueOnHover?: boolean;
   // displayMaxValue?: boolean;
   // displayMode?: "percent" | "value" | "unit";
   // displayUnit?: string;
   // displayCustomValue?: (value: number, max: number) => string;
   // displayPending?: string;
};

const iconSize = 20;

export const ProgressBar: FC<ProgressBarProps> = ({
   className,
   value,
   max,
   label,
   description,
   onCanceled,
   status = "progress",
   timeRemaining,
   displayFormatOptions,
   errorMessage,
   // mode = "determinate",
   // displayCustomValue,
   // displayMaxValue,
   // displayMode = "percent",
   // displayUnit,
   // displayValueOnHover,
   // displayFormatOptions = {},
   // displayPending,
}) => {
   const icons: Record<ProgressStatus, ReactNode> = {
      error: (
         <XCircle
            size={iconSize}
            weight="bold"
            className="text-red-500 dark:text-red-600"
         />
      ),
      success: (
         <CheckCircle
            size={iconSize}
            weight="bold"
            className="text-green-600 dark:text-green-600"
         />
      ),
      pending: <Spinner size="sm" />,
      progress: <Spinner size="sm" />,
   };
   const percent = value / max;

   const { formatNumber } = useIntl();

   const id = useId();

   const formattedTime = useMemo(() => {
      if (!timeRemaining) return null;

      const hours = Math.floor(timeRemaining / 3600);
      const minutes = Math.floor((timeRemaining % 3600) / 60);
      const seconds = Math.floor(timeRemaining % 60);

      const hoursText =
         hours > 0
            ? formatNumber(hours, {
                 style: "unit",
                 unit: "hour",
              })
            : "";

      const minutesText =
         minutes > 0
            ? formatNumber(minutes, {
                 style: "unit",
                 unit: "minute",
              })
            : "";

      const secondsText = formatNumber(seconds, {
         style: "unit",
         unit: "second",
      });

      return `${hoursText} ${minutesText} ${secondsText}`.trim();
   }, [timeRemaining]);

   return (
      <div className={cls("flex flex-col gap-2", className)}>
         <div className="flex justify-between">
            <div>
               <label
                  htmlFor={id}
                  className={cls({
                     "font-semibold text-sm": typeof label === "string",
                  })}
               >
                  {label}
               </label>
            </div>
            <div className="flex gap-1 items-center text-sm">
               {status.is("progress") && (
                  <span>
                     {formatNumber(percent, {
                        style: "percent",
                        maximumFractionDigits: 0,
                     })}
                  </span>
               )}
               <div className="group">
                  {onCanceled && (
                     <button
                        className="hidden group-hover:block"
                        onClick={onCanceled}
                     >
                        <X size={iconSize} weight="bold" />
                     </button>
                  )}
                  <span
                     className={cls({
                        "group-hover:hidden": onCanceled,
                     })}
                  >
                     {icons[status]}
                  </span>
               </div>
            </div>
         </div>
         <Progress.Root
            value={value}
            max={max}
            id={id}
            className="h-[0.35rem] bg-radix-gray-400 rounded-full"
         >
            <Progress.Indicator asChild>
               <motion.div
                  className={cls("h-full rounded-full", {
                     "bg-red-500 dark:bg-red-600": status === "error",
                     "bg-green-500 dark:bg-green-600": status === "success",
                     "bg-radix-indigo-600": status === "progress",
                     "progress-pending-bg": status === "pending",
                  })}
                  animate={{
                     width: `${["pending", "success"].includes(status) ? 100 : percent * 100}%`,
                  }}
               ></motion.div>
            </Progress.Indicator>
         </Progress.Root>
         {status.is("error") && errorMessage && (
            <span className="text-red-500 text-sm">{errorMessage}</span>
         )}
         {status.is("progress") && (
            <div className="flex gap-3 items-center">
               <span className="text-sm">
                  <FormattedMessage
                     id="common.progress.values"
                     values={{
                        progress: formatNumber(value, {
                           maximumFractionDigits: 2,
                           ...displayFormatOptions,
                        }),
                        max: formatNumber(max, displayFormatOptions),
                     }}
                  />
               </span>
               {timeRemaining && (
                  <>
                     <div className="size-1 rounded-full bg-radix-gray-1200" />
                     <span className="text-sm font-extralight">
                        <FormattedMessage
                           id="common.progress.remaining"
                           values={{
                              remaining: formattedTime,
                           }}
                        />
                     </span>
                  </>
               )}
            </div>
         )}
      </div>
   );
};
