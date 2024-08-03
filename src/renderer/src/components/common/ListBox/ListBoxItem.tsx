import { Icon } from "@iconify/react";
import { Node } from "@react-types/shared";
import { FC, useRef } from "react";
import { useOption } from "react-aria";
import { ListState } from "react-stately";

import { cls } from "@/utils/styleUtils";

export type ListBoxItemProps = {
   item: Node<unknown>;
   state: ListState<unknown>;
};

export const ListBoxItem: FC<ListBoxItemProps> = ({ item, state }) => {
   const ref = useRef<HTMLLIElement>(null);
   const { optionProps, isDisabled, isSelected, isFocused } = useOption(
      {
         key: item.key,
      },
      state,
      ref
   );
   return (
      <li
         {...optionProps}
         ref={ref}
         className={cls(
            "p-2 rounded-lg text-left flex items-center gap-2 truncate shrink-0 outline-none",
            {
               "hover:bg-radix-gray-600": !isDisabled,
               "bg-radix-gray-600": isFocused,
               "text-radix-gray-900": isDisabled,
            }
         )}
      >
         <div className="w-5 h-full flex items-center justify-center shrink-0">
            {isSelected && <Icon icon="ph:check-bold" />}
         </div>
         {item.rendered}
      </li>
   );
};
