import _ from "lodash";
import { Dispatch, SetStateAction, useMemo, useState } from "react";

import { DropdownElement, DropdownOptions, SelectedValue } from "./types";

type UseDropdownStateProps<Multiselect extends boolean> = {
   options?: DropdownOptions<Multiselect>;
   onChange?: (value: Set<SelectedValue>) => void;
   children?: DropdownElement[] | DropdownElement;
};

export type DropdownState = {
   selectedValues: Set<SelectedValue>;
   setSelectedValues: (value: SelectedValue) => void;
   isOpen: boolean;
   setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const useDropdownState = <Multiselect extends boolean>({
   options,
   onChange,
   children,
}: UseDropdownStateProps<Multiselect>): DropdownState => {
   const [selectedValues, setSelectedValues] = useState<Set<SelectedValue>>(
      () => {
         const childrenArray = Array.isArray(children) ? children : [children];
         const childrenValues = childrenArray.reduce<Set<SelectedValue>>(
            (acc, child) => {
               if (!child) return acc;
               if (!("value" in child.props)) return acc;

               if (child.props.value) {
                  return new Set([
                     ...acc,
                     {
                        value: child.props.value,
                        label: child.props.children ?? child.props.value,
                     },
                  ]);
               }
               return acc;
            },
            new Set()
         );

         return new Set(
            [...childrenValues].filter((value) =>
               options?.defaultValues?.includes(value.value)
            )
         );
      }
   );

   const [isOpen, setIsOpen] = useState<boolean>(false);

   const state = useMemo<DropdownState>(
      () => ({
         selectedValues,
         setSelectedValues: (newValue) => {
            if (options?.multiselect) {
               setSelectedValues((prev) => {
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
               setSelectedValues(new Set([newValue]));
               setIsOpen(false);
            }

            onChange?.(selectedValues);
         },
         isOpen,
         setIsOpen,
      }),
      [selectedValues, isOpen, setIsOpen]
   );

   return state;
};
