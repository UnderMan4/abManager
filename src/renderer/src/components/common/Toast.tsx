import {
   CheckCircle,
   Info,
   WarningCircle,
   XCircle,
} from "@phosphor-icons/react";
import { FC, ReactNode } from "react";

import { cls } from "@/utils/styleUtils";

export type ToastProps = {
   title: ReactNode;
   description?: ReactNode;
   variant: ToastVariant;
};

export type ToastVariant = "success" | "error" | "info" | "warning";

type ToastVariantStyles = {
   className: string;
   icon: ReactNode;
};

const iconSize = 20;

const variantMap: Record<ToastVariant, ToastVariantStyles> = {
   success: {
      className:
         "bg-green-100 border-green-600 dark:bg-green-950 dark:border-green-700",
      icon: (
         <CheckCircle
            size={iconSize}
            weight="bold"
            className="text-green-600 dark:text-green-700"
         />
      ),
   },
   error: {
      className:
         "bg-red-100 border-red-500 dark:bg-red-950 dark:border-red-700",
      icon: (
         <XCircle
            size={iconSize}
            weight="bold"
            className="text-red-500 dark:text-red-700"
         />
      ),
   },
   info: {
      className:
         "bg-radix-indigo-400 border-radix-indigo-900 dark:bg-radix-indigo-300 dark:border-radix-indigo-800",
      icon: (
         <Info
            size={iconSize}
            weight="bold"
            className="text-radix-indigo-900 dark:text-radix-indigo-800"
         />
      ),
   },
   warning: {
      className:
         "bg-yellow-100 border-yellow-600 dark:bg-yellow-950 dark:border-yellow-700",
      icon: (
         <WarningCircle
            size={iconSize}
            weight="bold"
            className="text-yellow-600 dark:text-yellow-700"
         />
      ),
   },
};

export const Toast: FC<ToastProps> = ({ title, variant, description }) => {
   const { className, icon } = variantMap[variant];

   return (
      <div
         className={cls(
            "flex gap-3 rounded-xl p-2 border items-center w-80",
            className
         )}
      >
         <div className="shrink-0">{icon}</div>
         <div>
            <span
               className={cls({ "font-semibold": typeof title === "string" })}
            >
               {title}
            </span>
            {description && (
               <p
                  className={cls({
                     "text-sm": typeof description === "string",
                  })}
               >
                  {description}
               </p>
            )}
         </div>
      </div>
   );
};
