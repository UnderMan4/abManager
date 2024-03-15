import { Icon } from "@iconify/react";
import { FC } from "react";
import { twMerge } from "tailwind-merge";

export type ConfirmItemProps = {
   icon: string;
   value: string | undefined;
};

export const ConfirmItem: FC<ConfirmItemProps> = ({ icon, value }) => {
   return (
      <div className="flex gap-3 items-center">
         <div className="bg-radix-gray-600 p-2 rounded-xl">
            <Icon icon={icon} height="1.7rem" />
         </div>
         <span>{value ?? "Unset"}</span>
      </div>
   );
};
