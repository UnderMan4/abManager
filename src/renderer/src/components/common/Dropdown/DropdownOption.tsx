import { FC } from "react";
import { twMerge } from "tailwind-merge";

import { DropdownContext } from "@/components/common/Dropdown/Dropdown";
import { useSafeContext } from "@/hooks";

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
   return (
      <button
         className={twMerge(
            "p-2 rounded-lg text-left",
            "hover:bg-radix-gray-600",
            className
         )}
         onClick={setSelectedValue.bind(null, {
            value,
            label: children ?? value,
         })}
      >
         {children}
      </button>
   );
};

export type DropdownOptionSeparatorProps = {
   label?: string;
};

const Separator: FC<DropdownOptionSeparatorProps> = ({ label }) => {
   return <div className="border-t border-radix-gray-300 my-1">{label}</div>;
};

DropdownOption.Separator = Separator;

export { DropdownOption };
