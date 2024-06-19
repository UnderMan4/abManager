import _ from "lodash";
import { Dispatch, SetStateAction, useMemo, useState } from "react";

import { DropdownOptions, SelectedValue } from "./types";

type UseDropdownStateProps = {
   options?: DropdownOptions;
   onChange?: (value: Set<SelectedValue>) => void;
};

export type DropdownState = {
   selectedValue: Set<SelectedValue>;
   setSelectedValue: (value: SelectedValue) => void;
   isOpen: boolean;
   setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const useDropdownState = ({
   options,
   onChange,
}: UseDropdownStateProps) => {
   const [selectedValue, setSelectedValue] = useState<Set<SelectedValue>>(
      options?.defaultValue
         ? Array.isArray(options.defaultValue)
            ? new Set(options?.defaultValue)
            : new Set([options.defaultValue])
         : new Set()
   );

   const [isOpen, setIsOpen] = useState(false);

   const state = useMemo<DropdownState>(
      () => ({
         selectedValue,
         setSelectedValue: (newValue) => {
            if (options?.multiselect) {
               setSelectedValue((prev) => {
                  if (
                     [...prev].some((value) => value.value === newValue.value)
                  ) {
                     return new Set(
                        [...prev].filter(
                           (value) => value.value !== newValue.value
                        )
                     );
                  }
                  return new Set(
                     _.orderBy(
                        [...prev, newValue],
                        [(item) => item.label.length, "label"],
                        ["asc", "asc"]
                     )
                  );
               });
            } else {
               setSelectedValue(new Set([newValue]));
               setIsOpen(false);
            }

            onChange?.(selectedValue);
         },
         isOpen,
         setIsOpen,
      }),
      [selectedValue, isOpen, setIsOpen]
   );

   return state;
};
