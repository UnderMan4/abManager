import { Node } from "@react-types/shared";
import { FC } from "react";
import { useListBoxSection } from "react-aria";
import { ListState } from "react-stately";

import { cls } from "@/utils/styleUtils";

import { ListBoxItem } from "./ListBoxItem";

export type ListBoxSectionProps = {
   section: Node<unknown>;
   state: ListState<unknown>;
};

export const ListBoxSection: FC<ListBoxSectionProps> = ({ section, state }) => {
   const { itemProps, headingProps, groupProps } = useListBoxSection({
      heading: section.rendered,
      "aria-label": section["aria-label"],
   });

   const children = state.collection.getChildren
      ? state.collection.getChildren(section.key)
      : new Set();
   return (
      <li {...itemProps}>
         <div
            {...headingProps}
            className={cls(
               "border-b border-radix-gray-1000 font-bold pl-4 mx-1 text-radix-gray-1000",
               {
                  "my-1 py-1": section.rendered,
                  "my-1": !section.rendered,
               }
            )}
         >
            {section.rendered}
         </div>
         <ul {...groupProps}>
            {[...children].map((item) => (
               //@ts-expect-error - Not sure how to type this
               <ListBoxItem key={item.key} item={item} state={state} />
            ))}
         </ul>
      </li>
   );
};
