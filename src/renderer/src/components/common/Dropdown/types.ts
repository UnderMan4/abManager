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

export type DropdownOptions = {
   multiselect?: boolean;
   defaultValue?: SelectedValue | SelectedValue[];
   placeholder?: string;
   label?: string;
};
