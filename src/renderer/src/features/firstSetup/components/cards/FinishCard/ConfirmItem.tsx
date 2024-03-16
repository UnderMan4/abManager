import { Icon } from "@iconify/react";
import { FC } from "react";

export type ConfirmItemProps = {
   icon: string;
   value: string | undefined;
   label: string;
};

export const ConfirmItem: FC<ConfirmItemProps> = ({ icon, value, label }) => {
   return (
      <div className="flex gap-3 items-center">
         <div className="bg-radix-indigo-a300 p-2 rounded-2xl">
            <Icon
               className="text-radix-indigo-1000"
               icon={icon}
               height="1.7rem"
            />
         </div>
         <div className="flex flex-col">
            <span className="text-xs opacity-50">{label}</span>
            <span>{value ?? "Unset"}</span>
         </div>
      </div>
   );
};
