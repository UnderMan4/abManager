import { FC } from "react";

import { ProgressBar, ProgressBarProps } from "@/components/common";

export type ProgressToastProps = {
   title: string;
   description?: string;
   progress: ProgressBarProps;
   secondaryProgress?: ProgressBarProps;
};

export const ProgressToast: FC<ProgressToastProps> = ({
   title,
   description,
   progress,
   secondaryProgress,
}) => {
   return (
      <div
         className={
            "flex flex-col gap-3 rounded-xl p-2 border items-center w-80"
         }
      >
         <span className="font-semibold">{title}</span>
         {description && <span className="text-sm">{description}</span>}
         <ProgressBar {...progress} />
         {secondaryProgress && <ProgressBar {...secondaryProgress} />}
      </div>
   );
};
