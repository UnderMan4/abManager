import { FC } from "react";
import { twMerge } from "tailwind-merge";

export type DropdownOptionProps = {
   className?: string;
   children?: string;
};

type DropdownOptionComponent = FC<DropdownOptionProps> & {
   Separator: FC<DropdownOptionSeparatorProps>;
};

const DropdownOption: DropdownOptionComponent = ({ className, children }) => {
   return <div className={twMerge("p-2", className)}>{children}</div>;
};

export type DropdownOptionSeparatorProps = {
   label?: string;
};

const Separator: FC<DropdownOptionSeparatorProps> = ({ label }) => {
   return <div className="border-t border-radix-gray-300 my-1">{label}</div>;
};

DropdownOption.Separator = Separator;

export { DropdownOption };
