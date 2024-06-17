import { Icon } from "@iconify/react";
import { FC, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { DropdownContext } from "@/components/common/Dropdown/Dropdown";
import { useSafeContext } from "@/hooks";
import { cls } from "@/utils/styleUtils";

export type DropdownOptionProps = {
   className?: string;
   children?: string;
   value: string;
};

type DropdownOptionComponent = FC<DropdownOptionProps> & {
   Separator: FC<DropdownOptionSeparatorProps>;
};

const DropdownOption: DropdownOptionComponent = ({
   className,
   children,
   value,
}) => {
   const { setSelectedValue, selectedValue } = useSafeContext(
      DropdownContext,
      "DropdownOption should be used within a Dropdown component"
   );

   const [isSelected, setIsSelected] = useState(
      [...selectedValue].some((v) => v.value === value)
   );

   useEffect(() => {
      setIsSelected([...selectedValue].some((v) => v.value === value));
   }, [selectedValue]);

   return (
      <button
         className={twMerge(
            "p-2 rounded-lg text-left flex items-center gap-2 truncate shrink-0",
            "hover:bg-radix-gray-600",
            className
         )}
         onClick={setSelectedValue.bind(null, {
            value,
            label: children ?? value,
         })}
      >
         <div className="w-5 h-full flex items-center justify-center shrink-0">
            {isSelected && <Icon icon="ph:check-bold" />}
         </div>
         <span className="truncate">{children}</span>
      </button>
   );
};

export type DropdownOptionSeparatorProps = {
   label?: string;
};

const Separator: FC<DropdownOptionSeparatorProps> = ({ label }) => {
   return (
      <div
         className={cls(
            "border-b border-radix-gray-1000 font-bold pl-4 mx-1 text-radix-gray-1000",
            {
               "my-1 py-1": label,
               "my-1": !label,
            }
         )}
      >
         {label}
      </div>
   );
};

DropdownOption.Separator = Separator;

export { DropdownOption };
