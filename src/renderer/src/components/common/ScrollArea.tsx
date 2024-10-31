import * as RadixScrollArea from "@radix-ui/react-scroll-area";
import { FC, ReactNode, useRef } from "react";
import { useResizeObserver } from "usehooks-ts";

import { cls } from "@/utils/styleUtils";

export type ScrollAreaProps = {
   className?: string;
   children?: ReactNode | ReactNode[];
};

export const ScrollArea: FC<ScrollAreaProps> = ({ className, children }) => {
   const containerRef = useRef<HTMLDivElement>(null);
   const dimensions = useResizeObserver({
      ref: containerRef,
   });
   return (
      <div className="min-h-0" ref={containerRef}>
         <RadixScrollArea.Root
            className="min-h-0 overflow-hidden"
            style={dimensions}
         >
            <RadixScrollArea.Viewport className={cls("size-full", className)}>
               {children}
            </RadixScrollArea.Viewport>
            <RadixScrollArea.Scrollbar
               orientation="vertical"
               className="select-none touch-none flex px-[5px] py-3"
            >
               <RadixScrollArea.Thumb
                  className={cls(
                     "flex-1 bg-radix-gray-800 !w-[5px] relative rounded-full",
                     "before:absolute before:-inset-x-2 before:h-full"
                  )}
               />
            </RadixScrollArea.Scrollbar>
            <RadixScrollArea.Scrollbar
               orientation="horizontal"
               className="select-none touch-none flex py-[5px] px-3"
            >
               <RadixScrollArea.Thumb
                  className={cls(
                     "flex-1 bg-radix-gray-800 !h-[5px] relative rounded-full",
                     "before:absolute before:-inset-y-2 before:w-full"
                  )}
               />
            </RadixScrollArea.Scrollbar>
         </RadixScrollArea.Root>
      </div>
   );
};
