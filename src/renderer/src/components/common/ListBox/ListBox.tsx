import { FC, RefObject, useRef } from "react";
import { AriaListBoxOptions, useListBox } from "react-aria";
import { ListState } from "react-stately";

import { ListBoxItem } from "./ListBoxItem";
import { ListBoxSection } from "./ListBoxSection";

export type ListBoxProps = AriaListBoxOptions<unknown> & {
   listBoxRef?: RefObject<HTMLUListElement>;
   state: ListState<unknown>;
   className?: string;
};

export const ListBox: FC<ListBoxProps> = (props) => {
   const ref = useRef<HTMLUListElement>(null);
   const { listBoxRef = ref, state, className } = props;
   const { listBoxProps } = useListBox(props, state, listBoxRef);
   return (
      <ul {...listBoxProps} ref={listBoxRef} className={className}>
         {[...state.collection].map((item) =>
            item.type === "section" ? (
               <ListBoxSection key={item.key} section={item} state={state} />
            ) : (
               <ListBoxItem key={item.key} item={item} state={state} />
            )
         )}
      </ul>
   );
};
