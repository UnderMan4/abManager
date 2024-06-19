import { FC, useLayoutEffect, useRef, useState } from "react";

import { cls } from "@/utils/styleUtils";

import { SelectedValue } from "./types";

export type DropdownMultiselectListProps = {
   list?: Set<SelectedValue>;
};

export const DropdownMultiselectList: FC<DropdownMultiselectListProps> = ({
   list = new Set(),
}) => {
   const ref = useRef<HTMLDivElement>(null);

   const [hiddenItems, setHiddenItems] = useState(0);

   useLayoutEffect(() => {
      if (!ref.current) return;

      const children = Array.from(ref.current.childNodes) as HTMLDivElement[];

      let childIndex: null | number = null;

      children.forEach((child) => (child.style.display = "flex"));

      children.forEach((child, index) => {
         if (child.offsetTop > ref.current!.offsetTop + 3) {
            if (childIndex === null) {
               childIndex = index;
            }
            child.style.display = "none";
         }
      });

      setHiddenItems(childIndex ? children.length - childIndex : 0);
   }, [list]);

   return (
      <div className="flex gap-2 w-[calc(100%-1.5rem)]">
         <div
            className={
               "flex overflow-hidden gap-2 items-stretch flex-wrap grow"
            }
            ref={ref}
         >
            {Array.from(list).map((value, index) => (
               <div className={"flex gap-2 items-center"} key={value.value}>
                  {index !== 0 && (
                     <div className="rounded-full size-1 bg-radix-gray-1200 shrink-0" />
                  )}
                  <span className="text-nowrap truncate">{value.label}</span>
               </div>
            ))}
         </div>
         <div
            className={cls(
               "relative ring-1 ring-radix-gray-800 rounded-xl bg-radix-gray-600 px-1",
               {
                  invisible: !hiddenItems,
               }
            )}
         >
            <span className="invisible">+99</span>
            <span className="absolute inset-0">
               +{Math.min(99, hiddenItems)}
            </span>
         </div>
      </div>
   );
};
