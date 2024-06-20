import { ReactElement } from "react";

import {
   DropdownOptionProps,
   DropdownOptionSeparatorProps,
} from "./DropdownOption";

export type DropdownElement =
   | ReactElement<DropdownOptionProps>
   | ReactElement<DropdownOptionSeparatorProps>;

export type SelectedValue = {
   value: string;
   label: string;
};

export type DropdownOptions<Multiselect extends boolean> = {
   multiselect?: Multiselect;
   defaultValues?: Multiselect extends true ? string[] : string | [string];
   placeholder?: string;
   label?: string;
};
