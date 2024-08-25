import { Icon } from "@iconify/react";
import { ButtonHTMLAttributes, FC } from "react";

import { cls } from "@/utils/styleUtils";

export type RoundProgressBarProps = ButtonHTMLAttributes<HTMLButtonElement> & {
   className?: string;
   iconClassName?: string;
   icon: string;
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
   iconClassName,
   ...props
}) => {
   const radius = 50;
   const circumference = 2 * Math.PI * radius;
   const progressPercentage = (progressValue / progressMax) * 100;
   const offset = circumference - (progressPercentage / 100) * circumference;

   return (
      <button
         className={cls("relative aspect-square size-8 center", className)}
         {...props}
      >
         <svg
            className="absolute inset-0 w-full h-full -rotate-90"
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
         </svg>
         <Icon icon={icon} className={cls("size-[54%]", iconClassName)} />
      </button>
   );
};
