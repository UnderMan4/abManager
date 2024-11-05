import { FC } from "react";
import { twMerge } from "tailwind-merge";

import { LocaleSwitcher } from "@/features/i18n";
import { ColorPaletteSelector } from "@/features/settings/components";

export type DashboardProps = {
   className?: string;
};

export const Dashboard: FC<DashboardProps> = ({ className }) => {
   return (
      <div className={twMerge("flex flex-col gap-2 p-4", className)}>
         <LocaleSwitcher />
         <ColorPaletteSelector />
      </div>
   );
};
