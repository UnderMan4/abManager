import { motion } from "framer-motion";
import { FC, ReactNode } from "react";

import { cls } from "@/utils/styleUtils";

export type RoundProgressBarProps = {
   className?: string;
   icon: ReactNode;
   progressMax: number;
   progressValue: number;
   progressType?: "indeterminate" | "determinate";
};

export const RoundProgressBar: FC<RoundProgressBarProps> = ({
   className,
   icon,
   progressMax,
   progressValue,
   progressType = "determinate",
}) => {
   const radius = 55;
   const circumference = 2 * Math.PI * radius;
   const progressPercentage = (progressValue / progressMax) * 100;
   const offset = circumference - (progressPercentage / 100) * circumference;

   return (
      <div className={cls("relative aspect-square size-8 center", className)}>
         <svg
            className={"absolute inset-0 w-full h-full -rotate-90"}
            viewBox="0 0 120 120"
         >
            <circle
               className="text-radix-gray-500"
               strokeWidth="10"
               stroke="currentColor"
               fill="transparent"
               r={radius}
               cx="60"
               cy="60"
            />
            {progressType === "determinate" && (
               <circle
                  className="text-radix-indigo-900"
                  strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r={radius}
                  cx="60"
                  cy="60"
               />
            )}
            {progressType === "indeterminate" && (
               <motion.circle
                  className="text-radix-indigo-900"
                  strokeWidth="10"
                  strokeDasharray={`${circumference * 0.25} ${circumference * 0.75}`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r={radius}
                  cx="60"
                  cy="60"
                  animate={{
                     rotate: [0, 360],
                  }}
                  transition={{
                     duration: 1,
                     repeat: Infinity,
                     ease: "linear",
                  }}
               />
            )}
         </svg>
         {icon}
      </div>
   );
};
